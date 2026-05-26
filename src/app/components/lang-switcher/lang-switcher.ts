import { Component, inject, signal } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-lang-switcher',
  imports: [],
  templateUrl: './lang-switcher.html',
  styleUrl: './lang-switcher.css',
})
export class LangSwitcher {
  private readonly translate = inject(TranslateService);
  readonly currentLang = this.translate.currentLang;

  readonly flipping = signal(false);
  private flipTimer: ReturnType<typeof setTimeout> | null = null;

  switchLang(): void {
    this.flipping.set(true);
    this.translate.switchLang();

    if (this.flipTimer) clearTimeout(this.flipTimer);
    this.flipTimer = setTimeout(() => {
      this.flipping.set(false);
      this.flipTimer = null;
    }, 600);
  }
}
