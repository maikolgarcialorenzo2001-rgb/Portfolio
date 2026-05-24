import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-study-projects',
  imports: [RouterLink],
  templateUrl: './study-projects.component.html',
  styleUrl: './study-projects.component.css',
})
export default class StudyProjectsComponent {
  private readonly content = inject(ContentService);
  readonly projects = this.content.allStudyProjects;

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
