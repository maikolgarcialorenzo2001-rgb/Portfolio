import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly content = inject(ContentService);
  private readonly translate = inject(TranslateService);

  readonly profile = this.content.profileData;
  readonly currentYear = new Date().getFullYear();
  readonly t = this.translate.t.bind(this.translate);

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
