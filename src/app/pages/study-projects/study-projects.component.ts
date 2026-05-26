import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { TranslateService } from '../../services/translate.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-study-projects',
  imports: [RouterLink],
  templateUrl: './study-projects.component.html',
  styleUrl: './study-projects.component.css',
})
export default class StudyProjectsComponent {
  private readonly content = inject(ContentService);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);

  readonly projects = this.content.allStudyProjects;
  readonly t = this.translate.t.bind(this.translate);

  constructor() {
    this.seo.setPageMeta({
      title: 'Proyectos de Estudio',
      description: 'Proyectos de aprendizaje de Maikol Garcia Lorenzo — cada proyecto refleja un escalón en su evolución como desarrollador.',
      keywords: 'proyectos de estudio, learning projects, frontend, javascript, angular',
      ogImage: '/assets/img/og-placeholder.svg',
    });
  }

  readonly iconMap: Record<string, string> = {
    Angular: 'angular',
    TypeScript: 'typescript',
    JavaScript: 'javascript',
    'Tailwind CSS': 'tailwindcss',
    Alpine: 'alpinejs',
  };

  readonly techColors: Record<string, string> = {
    Angular: '#dd0031',
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    'Tailwind CSS': '#38bdf8',
    HTML5: '#e34f26',
    Rollup: '#ec4a3f',
    'Alpine.js': '#8bc0d0',
    Supabase: '#3ecf8e',
    RxJS: '#e74c3c',
    Docker: '#2496ed',
    SSR: '#64748b',
    Vitest: '#6b9f3a',
    'Chart.js': '#ff6384',
    PWA: '#5c6bc0',
  };

  getIcon(techName: string): string | null {
    return this.iconMap[techName] ?? null;
  }

  getTechColor(techName: string): string {
    return this.techColors[techName] ?? '#64748b';
  }
}
