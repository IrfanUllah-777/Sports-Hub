import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'sportshub-theme';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Local storage access might fail in restricted environments
  }
  return 'light';
}

let transitionTimeoutId: ReturnType<typeof setTimeout> | null = null;

export function applyTheme(theme: Theme, withTransition: boolean = false) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (withTransition) {
    if (transitionTimeoutId !== null) {
      clearTimeout(transitionTimeoutId);
    }
    root.classList.add('theme-transitioning');
  }

  root.setAttribute('data-theme', theme);

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors
  }

  if (withTransition) {
    transitionTimeoutId = setTimeout(() => {
      root.classList.remove('theme-transitioning');
      transitionTimeoutId = null;
    }, 250);
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    // Ensure initial theme is synced with the document
    const currentAttr = document.documentElement.getAttribute('data-theme') as Theme | null;
    if (currentAttr && (currentAttr === 'dark' || currentAttr === 'light')) {
      if (currentAttr !== theme) {
        setThemeState(currentAttr);
      }
    } else {
      applyTheme(theme, false);
    }

    // Listen for system theme changes if no explicit preference is saved
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (!saved) {
        const newTheme: Theme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        applyTheme(newTheme, true);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme, true);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
      return nextTheme;
    });
  }, []);

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
}
