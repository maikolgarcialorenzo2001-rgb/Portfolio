import { Component, inject, computed } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-cv-section',
  imports: [],
  templateUrl: './cv-section.html',
  styleUrl: './cv-section.css',
})
export class CvSection {
  private readonly content = inject(ContentService);
  private readonly translate = inject(TranslateService);

  readonly profile = this.content.profileData;
  readonly t = this.translate.t.bind(this.translate);

  /** Computed CV filename — cambia automáticamente con el idioma */
  readonly cvFile = computed(() =>
    this.translate.currentLang() === 'es' ? 'es' : 'en',
  );
}
