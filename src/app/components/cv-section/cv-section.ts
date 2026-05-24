import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-cv-section',
  imports: [],
  templateUrl: './cv-section.html',
  styleUrl: './cv-section.css',
})
export class CvSection {
  private readonly content = inject(ContentService);
  readonly profile = this.content.profileData;
  readonly allSkills = this.content.allSkills;
  readonly currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
  });
}
