export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  shortBio: string;
  location: string;
  email: string;
  avatar: string;
  socialLinks: SocialLink[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    technologiesUsed: number;
    happyClients?: number;
  };
}
