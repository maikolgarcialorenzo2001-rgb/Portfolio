import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconService {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
    this.registerIcons();
  }

  private registerIcons(): void {
    const icons = [
      'html5', 'css3', 'javascript', 'typescript',
      'angular', 'nodejs', 'fire', 'git', 'github',
      'email', 'cv', 'linkedin', 'vscode',
      'supabase', 'rxjs', 'vitest',
    ];

    icons.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`),
      );
    });
  }
}
