export type SkillCategory = 'frontend' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number;
}
