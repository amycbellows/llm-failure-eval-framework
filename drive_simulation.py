"""Drive Simulation — 100,000 people, 8 drive factors, live terminal dashboard.

Run: python3 drive_simulation.py [--ticks N] [--pop N] [--seed N] [--delay SECS]
Press Ctrl-C any time to stop.
"""

from __future__ import annotations

import argparse
import random
import time
from collections import deque
from dataclasses import dataclass

import numpy as np
from rich.align import Align
from rich.console import Console, Group
from rich.layout import Layout
from rich.live import Live
from rich.panel import Panel
from rich.table import Table
from rich.text import Text


DRIVES = [
    "greed",
    "lust",
    "hunger",
    "thirst",
    "empathy",
    "self_preservation",
    "desperation",
    "ambition",
]

DRIVE_COLORS = {
    "greed": "gold1",
    "lust": "magenta",
    "hunger": "orange3",
    "thirst": "cyan",
    "empathy": "green",
    "self_preservation": "blue",
    "desperation": "red",
    "ambition": "purple",
}

DRIVE_GLYPHS = {
    "greed": "$",
    "lust": "@",
    "hunger": "%",
    "thirst": "~",
    "empathy": "+",
    "self_preservation": "#",
    "desperation": "!",
    "ambition": "^",
}

ACTIONS = {
    "greed":             "hoards resources",
    "lust":              "chases a lover",
    "hunger":            "forages for food",
    "thirst":            "searches for water",
    "empathy":           "helps a stranger",
    "self_preservation": "flees from danger",
    "desperation":       "takes a wild risk",
    "ambition":          "schemes for power",
}

FIRST_NAMES = [
    "Ada", "Bram", "Cato", "Dio", "Eir", "Fen", "Gita", "Hal", "Iza", "Juno",
    "Kai", "Lior", "Mira", "Nox", "Osa", "Pax", "Quin", "Rue", "Sage", "Tao",
    "Uma", "Vex", "Wren", "Xan", "Yara", "Zed", "Aria", "Bode", "Cleo", "Doran",
]
LAST_NAMES = [
    "Ash", "Brook", "Cinder", "Dale", "Ember", "Frost", "Glade", "Hollow",
    "Iron", "Jay", "Kite", "Lark", "Moss", "North", "Oak", "Pine",
    "Quill", "Raven", "Stone", "Thorn", "Umber", "Vale", "Wisp", "Yew",
]


def make_name(rng: random.Random) -> str:
    return f"{rng.choice(FIRST_NAMES)} {rng.choice(FIRST_NAMES)}{rng.choice(LAST_NAMES).lower()}"


# ---------- simulation ----------


@dataclass
class Event:
    tick: int
    text: str
    color: str = "white"


class World:
    def __init__(self, pop: int, seed: int = 42):
        self.pop = pop
        self.tick = 0
        self.rng_np = np.random.default_rng(seed)
        self.rng = random.Random(seed)

        # drives: shape (pop, 8), values 0..100
        base = self.rng_np.normal(loc=40, scale=12, size=(pop, len(DRIVES)))
        # personality biases — each person has a latent preference per drive
        self.bias = self.rng_np.normal(loc=0, scale=0.8, size=(pop, len(DRIVES)))
        self.drives = np.clip(base, 0, 100).astype(np.float32)

        self.alive = np.ones(pop, dtype=bool)
        self.deaths_this_tick = 0
        self.births_this_tick = 0
        self.events: deque[Event] = deque(maxlen=8)
        self.action_counts = np.zeros(len(DRIVES), dtype=np.int64)

        # sampled cohort we follow by name
        self.sample_idx = self.rng_np.choice(pop, size=6, replace=False)
        self.sample_names = [make_name(self.rng) for _ in range(6)]

        self.push_event("World seeded. 100,000 souls begin to stir.", "bold cyan")

    # -- event log --
    def push_event(self, text: str, color: str = "white") -> None:
        self.events.appendleft(Event(self.tick, text, color))

    # -- tick --
    def step(self) -> None:
        self.tick += 1
        alive = self.alive
        n = alive.sum()
        if n == 0:
            return

        # 1. natural drift: physiological drives rise, others wobble
        drift = np.zeros_like(self.drives)
        drift[:, DRIVES.index("hunger")]     = 1.4
        drift[:, DRIVES.index("thirst")]     = 1.8
        drift[:, DRIVES.index("desperation")] = 0.2
        drift[:, DRIVES.index("ambition")]   = 0.1
        noise = self.rng_np.normal(0, 1.5, size=self.drives.shape).astype(np.float32)
        noise += self.bias.astype(np.float32) * 0.6
        self.drives[alive] = self.drives[alive] + drift[alive] + noise[alive]

        # 2. coupling: hunger/thirst feed desperation; empathy dampens greed
        h = self.drives[:, DRIVES.index("hunger")]
        t = self.drives[:, DRIVES.index("thirst")]
        feed = np.maximum(0, (h + t) / 2 - 60) * 0.15
        self.drives[:, DRIVES.index("desperation")] += feed

        e = self.drives[:, DRIVES.index("empathy")]
        g_idx = DRIVES.index("greed")
        self.drives[:, g_idx] -= np.maximum(0, e - 60) * 0.05

        # 3. everyone acts on their dominant drive this tick
        dominant = np.argmax(self.drives, axis=1)
        dominant[~alive] = -1
        # tally actions (alive only)
        for i in range(len(DRIVES)):
            self.action_counts[i] += int(((dominant == i) & alive).sum())

        # action effects — relief of the chased drive, cost elsewhere
        for i, name in enumerate(DRIVES):
            mask = alive & (dominant == i)
            if not mask.any():
                continue
            self.drives[mask, i] -= self.rng_np.uniform(12, 22, size=mask.sum()).astype(np.float32)
            if name == "empathy":
                # helpers also ease the desperation of others (population-level)
                ease = self.rng_np.uniform(0.5, 1.2)
                self.drives[alive, DRIVES.index("desperation")] -= ease
            if name == "self_preservation":
                self.drives[mask, DRIVES.index("desperation")] -= 4
            if name == "greed":
                # hoarders raise desperation of the whole population slightly
                self.drives[alive, DRIVES.index("desperation")] += 0.3
            if name == "desperation":
                # desperate acts are risky: small chance of death
                risk = self.rng_np.random(mask.sum()) < 0.003
                die_idx = np.where(mask)[0][risk]
                if die_idx.size:
                    self.alive[die_idx] = False
            if name == "ambition":
                self.drives[mask, DRIVES.index("greed")] += 1.5

        # 4. mortality from neglected needs
        lethal = alive & ((self.drives[:, DRIVES.index("thirst")] > 99) |
                          (self.drives[:, DRIVES.index("hunger")] > 99))
        if lethal.any():
            roll = self.rng_np.random(lethal.sum()) < 0.08
            idx = np.where(lethal)[0][roll]
            self.alive[idx] = False

        self.deaths_this_tick = int((~self.alive & alive).sum())

        # 5. clamp
        np.clip(self.drives, 0, 100, out=self.drives)

        # 6. narrate a couple of events
        self._narrate(dominant)

    def _narrate(self, dominant: np.ndarray) -> None:
        # pick a random alive sample to narrate
        alive_idx = np.where(self.alive)[0]
        if alive_idx.size == 0:
            return
        for _ in range(self.rng.randint(1, 2)):
            i = int(self.rng_np.choice(alive_idx))
            d = int(dominant[i])
            if d < 0:
                continue
            name = make_name(self.rng)
            drive = DRIVES[d]
            self.push_event(
                f"{name} {ACTIONS[drive]} [{drive}={int(self.drives[i, d])}]",
                DRIVE_COLORS[drive],
            )
        if self.deaths_this_tick:
            self.push_event(
                f"{self.deaths_this_tick} souls perished from unmet needs.",
                "bold red",
            )


# ---------- rendering ----------


def bar(value: float, width: int = 24, color: str = "white") -> Text:
    filled = int(round(width * value / 100))
    t = Text()
    t.append("█" * filled, style=color)
    t.append("░" * (width - filled), style="grey30")
    return t


def render_drive_levels(world: World) -> Panel:
    alive_mask = world.alive
    means = world.drives[alive_mask].mean(axis=0) if alive_mask.any() else np.zeros(len(DRIVES))
    table = Table.grid(padding=(0, 1))
    table.add_column(justify="right", style="bold")
    table.add_column()
    table.add_column(justify="right")
    for i, name in enumerate(DRIVES):
        color = DRIVE_COLORS[name]
        glyph = Text(f"{DRIVE_GLYPHS[name]} {name}", style=color)
        table.add_row(glyph, bar(float(means[i]), 30, color), Text(f"{means[i]:5.1f}", style=color))
    return Panel(table, title="[bold]mean drive levels[/bold]", border_style="cyan")


def render_dominant(world: World) -> Panel:
    alive = world.alive
    if not alive.any():
        return Panel(Text("no survivors"), title="dominant drive", border_style="red")
    dominant = np.argmax(world.drives[alive], axis=1)
    counts = np.bincount(dominant, minlength=len(DRIVES))
    total = counts.sum()
    table = Table.grid(padding=(0, 1))
    table.add_column(justify="right", style="bold")
    table.add_column()
    table.add_column(justify="right")
    order = np.argsort(-counts)
    for i in order:
        name = DRIVES[i]
        pct = counts[i] / total * 100 if total else 0
        color = DRIVE_COLORS[name]
        table.add_row(
            Text(name, style=color),
            bar(pct, 30, color),
            Text(f"{counts[i]:>6,}  {pct:4.1f}%", style=color),
        )
    return Panel(table, title="[bold]currently-dominant drive[/bold]", border_style="magenta")


def render_events(world: World) -> Panel:
    lines = []
    for ev in list(world.events):
        lines.append(Text.assemble((f"t{ev.tick:>3} ", "grey50"), (ev.text, ev.color)))
    body = Group(*lines) if lines else Text("—")
    return Panel(body, title="[bold]recent events[/bold]", border_style="yellow")


def render_sample(world: World) -> Panel:
    table = Table.grid(padding=(0, 1))
    table.add_column(style="bold white")
    for d in DRIVES:
        table.add_column(justify="right", style=DRIVE_COLORS[d])
    table.add_row("name", *[DRIVE_GLYPHS[d] for d in DRIVES])
    for idx, name in zip(world.sample_idx, world.sample_names):
        if not world.alive[idx]:
            table.add_row(Text(name + " †", style="strike grey50"),
                          *[Text("—", style="grey50") for _ in DRIVES])
            continue
        row = [name]
        for i, d in enumerate(DRIVES):
            v = world.drives[idx, i]
            row.append(Text(f"{int(v):3d}", style=DRIVE_COLORS[d]))
        table.add_row(*row)
    return Panel(table, title="[bold]followed cohort[/bold]", border_style="green")


def render_header(world: World) -> Panel:
    alive = int(world.alive.sum())
    dead = world.pop - alive
    head = Text.assemble(
        ("⌂ DRIVE SIMULATOR ", "bold white on deep_pink4"),
        (f"  tick {world.tick:>4}  ", "bold"),
        (f"alive {alive:>7,}  ", "green"),
        (f"dead {dead:>6,}  ", "red"),
        (f"deaths/tick {world.deaths_this_tick:>4}", "bold red"),
    )
    return Panel(Align.center(head), border_style="deep_pink4")


def render_action_bar(world: World) -> Panel:
    total = world.action_counts.sum() or 1
    table = Table.grid(padding=(0, 1))
    table.add_column(justify="right", style="bold")
    table.add_column()
    table.add_column(justify="right")
    order = np.argsort(-world.action_counts)
    for i in order:
        name = DRIVES[i]
        pct = world.action_counts[i] / total * 100
        color = DRIVE_COLORS[name]
        table.add_row(
            Text(ACTIONS[name], style=color),
            bar(pct, 30, color),
            Text(f"{world.action_counts[i]:>10,}  {pct:4.1f}%", style=color),
        )
    return Panel(table, title="[bold]cumulative actions taken[/bold]", border_style="blue")


def build_layout(world: World) -> Layout:
    root = Layout()
    root.split_column(
        Layout(name="header", size=3),
        Layout(name="body"),
    )
    root["body"].split_row(
        Layout(name="left"),
        Layout(name="right"),
    )
    root["left"].split_column(
        Layout(render_drive_levels(world), name="levels"),
        Layout(render_dominant(world), name="dominant"),
    )
    root["right"].split_column(
        Layout(render_events(world), name="events"),
        Layout(render_sample(world), name="sample"),
        Layout(render_action_bar(world), name="actions"),
    )
    root["header"].update(render_header(world))
    return root


# ---------- main ----------


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pop", type=int, default=100_000)
    ap.add_argument("--ticks", type=int, default=200)
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--delay", type=float, default=0.12, help="seconds between ticks")
    args = ap.parse_args()

    console = Console()
    console.print(f"[bold cyan]seeding {args.pop:,} souls…[/bold cyan]")
    world = World(pop=args.pop, seed=args.seed)

    try:
        with Live(build_layout(world), console=console, refresh_per_second=12, screen=True) as live:
            for _ in range(args.ticks):
                world.step()
                live.update(build_layout(world))
                time.sleep(args.delay)
                if not world.alive.any():
                    world.push_event("humanity is extinct.", "bold red")
                    live.update(build_layout(world))
                    break
    except KeyboardInterrupt:
        pass

    console.print()
    console.print("[bold green]simulation ended.[/bold green]")
    console.print(f"final alive: {int(world.alive.sum()):,} / {world.pop:,}")
    console.print("top cumulative actions:")
    order = np.argsort(-world.action_counts)
    for i in order[:4]:
        console.print(f"  {DRIVES[i]:>18}  {int(world.action_counts[i]):>12,}")


if __name__ == "__main__":
    main()
