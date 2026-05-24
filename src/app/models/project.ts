export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status?: 'completed' | 'wip';
}
