import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {
  private readonly theme = inject(ThemeService);
  readonly isDark = this.theme.isDark;

  toggle(): void {
    this.theme.toggle();
  }
}
