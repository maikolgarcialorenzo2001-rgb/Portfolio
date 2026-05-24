import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-about-section',
  imports: [],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
})
export class AboutSection {
  private readonly content = inject(ContentService);
  readonly profile = this.content.profileData;
  readonly stats = [
    { label: 'Proyectos', value: this.content.profileData().stats.projectsCompleted + '+' },
    { label: 'Tecnologías', value: this.content.profileData().stats.technologiesUsed + '+' },
  ];

  /** Bio dividido en párrafos para renderizar con <p> */
  get bioParagraphs(): string[] {
    return this.profile().bio
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }
}
