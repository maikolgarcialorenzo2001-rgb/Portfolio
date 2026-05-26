import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-about-section',
  imports: [],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
})
export class AboutSection {
  private readonly content = inject(ContentService);
  private readonly translate = inject(TranslateService);

  readonly profile = this.content.profileData;
  readonly t = this.translate.t.bind(this.translate);

  readonly stats = [
    { key: 'about.stats.projects' as const, value: this.content.profileData().stats.projectsCompleted + '+' },
    { key: 'about.stats.technologies' as const, value: this.content.profileData().stats.technologiesUsed + '+' },
  ];

  /** Bio dividido en párrafos — traducido según el idioma activo */
  get bioParagraphs(): string[] {
    return this.translate.t('content.bio')
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }
}
