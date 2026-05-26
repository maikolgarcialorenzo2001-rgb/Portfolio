import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isDark = signal(false);

  constructor() {
    // Restore from localStorage on init
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark') {
        this.isDark.set(true);
        document.documentElement.classList.add('dark');
      }

      // Sync signal → DOM + localStorage
      effect(() => {
        if (this.isDark()) {
          document.documentElement.classList.add('dark');
          localStorage.setItem(STORAGE_KEY, 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem(STORAGE_KEY, 'light');
        }
      });
    }
  }

  toggle(): void {
    this.isDark.update(v => !v);
  }
}
