import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import type { SkillCategory } from '../../models/skill';

@Component({
  selector: 'app-skills-preview',
  imports: [],
  templateUrl: './skills-preview.html',
  styleUrl: './skills-preview.css',
})
export class SkillsPreview {
  private readonly content = inject(ContentService);

  readonly categories = [
    { key: 'frontend' as SkillCategory, label: 'Frontend' },
    { key: 'tools' as SkillCategory, label: 'Herramientas' },
  ];

  readonly iconMap: Record<string, string> = {
    Angular: 'angular',
    TypeScript: 'typescript',
    JavaScript: 'javascript',
    HTML5: 'html5',
    CSS3: 'css3',
    'Tailwind CSS': 'tailwindcss',
    RxJS: 'rxjs',
    Git: 'git',
    'VS Code': 'vscode',
    Vitest: 'vitest',
  };

  /** Color de marca distintivo de cada skill — usado en hover */
  readonly skillColors: Record<string, string> = {
    Angular: '#dd0031',
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    HTML5: '#e34f26',
    CSS3: '#1572b6',
    'Tailwind CSS': '#06b6d4',
    RxJS: '#d81b60',
    Git: '#f05032',
    'VS Code': '#007acc',
    Vitest: '#729b1a',
  };

  getIcon(skillName: string): string | null {
    return this.iconMap[skillName] ?? null;
  }

  getSkillColor(skillName: string): string {
    return this.skillColors[skillName] ?? '#64748b';
  }

  getSkills(category: SkillCategory) {
    return this.content.getSkillsByCategory(category);
  }
}
