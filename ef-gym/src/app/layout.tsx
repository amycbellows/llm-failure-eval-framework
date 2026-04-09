import type { Metadata } from 'next';
import './globals.css';
import { SettingsProvider } from '@/context/SettingsContext';
import { ProgressProvider } from '@/context/ProgressContext';
import Nav from '@/components/layout/Nav';

export const metadata: Metadata = {
  title: 'EF Gym — Executive Function Training',
  description:
    'An interactive training gym for building executive function skills. Designed for neurodivergent minds.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SettingsProvider>
          <ProgressProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Nav />
            <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
              {children}
            </main>
            <footer className="border-t border-surface-border py-4 text-center text-sm text-muted">
              EF Gym — Practice at your own pace
            </footer>
          </ProgressProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
