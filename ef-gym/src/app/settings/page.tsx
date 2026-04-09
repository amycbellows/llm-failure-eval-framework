'use client';

import { useSettings } from '@/context/SettingsContext';
import type { Theme, FontSize } from '@/types/progress';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  const { settings, setTheme, setFontSize, toggleReduceMotion, toggleShowScores, resetSettings } =
    useSettings();

  const themes: { value: Theme; label: string; description: string }[] = [
    { value: 'light', label: 'Light', description: 'Default light theme' },
    { value: 'dark', label: 'Dark', description: 'Easier on the eyes' },
    { value: 'high-contrast', label: 'High Contrast', description: 'Maximum readability' },
  ];

  const fontSizes: { value: FontSize; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted">Make this space work for you.</p>
      </div>

      {/* Theme */}
      <Card>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Theme</h2>
        <div className="flex flex-wrap gap-2">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                settings.theme === t.value
                  ? 'bg-accent text-white'
                  : 'bg-surface-border text-foreground hover:bg-accent-light'
              }`}
              aria-pressed={settings.theme === t.value}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Font Size */}
      <Card>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Text Size</h2>
        <div className="flex flex-wrap gap-2">
          {fontSizes.map((f) => (
            <button
              key={f.value}
              onClick={() => setFontSize(f.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                settings.fontSize === f.value
                  ? 'bg-accent text-white'
                  : 'bg-surface-border text-foreground hover:bg-accent-light'
              }`}
              aria-pressed={settings.fontSize === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Accessibility toggles */}
      <Card>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Accessibility</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Reduce motion</p>
              <p className="text-sm text-muted">Minimize animations and transitions</p>
            </div>
            <button
              role="switch"
              aria-checked={settings.reduceMotion}
              onClick={toggleReduceMotion}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.reduceMotion ? 'bg-accent' : 'bg-surface-border'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.reduceMotion ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Show scores</p>
              <p className="text-sm text-muted">Display numeric scores after exercises</p>
            </div>
            <button
              role="switch"
              aria-checked={settings.showScores}
              onClick={toggleShowScores}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.showScores ? 'bg-accent' : 'bg-surface-border'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.showScores ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </label>
        </div>
      </Card>

      {/* Reset */}
      <Card>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Reset</h2>
        <Button variant="ghost" onClick={resetSettings}>
          Reset to defaults
        </Button>
      </Card>
    </div>
  );
}
