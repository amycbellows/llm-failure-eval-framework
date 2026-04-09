'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { UserSettings, Theme, FontSize } from '@/types/progress';
import { DEFAULT_SETTINGS } from '@/types/progress';
import { loadFromStorage, saveToStorage } from '@/lib/storage';

interface SettingsContextValue {
  settings: UserSettings;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  toggleReduceMotion: () => void;
  toggleShowScores: () => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage<UserSettings>('settings', DEFAULT_SETTINGS);
    setSettings(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveToStorage('settings', settings);
  }, [settings, loaded]);

  // Apply theme to document
  useEffect(() => {
    if (!loaded) return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'high-contrast');
    root.classList.add(settings.theme);

    // Respect prefers-reduced-motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Font size
    root.dataset.fontSize = settings.fontSize;
  }, [settings.theme, settings.reduceMotion, settings.fontSize, loaded]);

  const setTheme = useCallback((theme: Theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const setFontSize = useCallback((fontSize: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize }));
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setSettings((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  }, []);

  const toggleShowScores = useCallback(() => {
    setSettings((prev) => ({ ...prev, showScores: !prev.showScores }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, setTheme, setFontSize, toggleReduceMotion, toggleShowScores, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
