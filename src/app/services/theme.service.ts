import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  
  private _isDarkMode = signal(this.getInitialTheme());
  
  isDarkMode = this._isDarkMode.asReadonly();

  private getInitialTheme(): boolean {
    const stored = localStorage.getItem(this.THEME_KEY);
    if (stored) {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggle() {
    this._isDarkMode.update((v) => !v);
    localStorage.setItem(this.THEME_KEY, this._isDarkMode() ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    document.body.classList.toggle('light-mode', !this._isDarkMode());
    document.body.classList.toggle('dark-mode', this._isDarkMode());
  }
}