'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/exercises/task-initiation', label: 'Exercises' },
  { href: '/progress', label: 'Progress' },
  { href: '/settings', label: 'Settings' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="border-b border-surface-border bg-surface">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-bold text-foreground hover:text-accent"
        >
          EF Gym
        </Link>
        <ul className="flex gap-1">
          {links.map(({ href, label }) => {
            const isActive =
              href === '/'
                ? pathname === '/'
                : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-accent-light text-accent'
                        : 'text-muted hover:bg-accent-light hover:text-accent'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
