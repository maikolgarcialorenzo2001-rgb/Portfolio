import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-projects-preview',
  imports: [RouterLink],
  templateUrl: './projects-preview.html',
  styleUrl: './projects-preview.css',
})
export class ProjectsPreview {
  private readonly content = inject(ContentService);
  private readonly translate = inject(TranslateService);

  readonly projects = this.content.getFeaturedProjects();
  readonly t = this.translate.t.bind(this.translate);

  /** Mapeo de tecnología → nombre de archivo SVG en assets/icons/ */
  readonly iconMap: Record<string, string> = {
    Angular: 'angular',
    TypeScript: 'typescript',
    JavaScript: 'javascript',
    HTML5: 'html5',
    CSS3: 'css3',
    'Tailwind CSS': 'tailwindcss',
    RxJS: 'rxjs',
    Signals: 'angular',
    SSR: 'nodejs',
    Supabase: 'supabase',
    Vitest: 'vitest',
  };

  /** Color distintivo de cada tecnología */
  readonly techColors: Record<string, string> = {
    Angular: '#dd0031',
    TypeScript: '#3178c6',
    'Tailwind CSS': '#06b6d4',
    RxJS: '#d81b60',
    Signals: '#dd0031',
    SSR: '#64748b',
    Supabase: '#3ecf8e',
    Vitest: '#1b8a35',
  };

  getIcon(techName: string): string | null {
    return this.iconMap[techName] ?? null;
  }

  getTechColor(techName: string): string {
    return this.techColors[techName] ?? '#64748b';
  }
}
