import { Injectable, signal } from '@angular/core';
import type { Skill } from '../models/skill';
import type { Profile } from '../models/profile';
import type { Project } from '../models/project';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly skills = signal<Skill[]>(SKILLS_DATA);
  private readonly profile = signal<Profile>(PROFILE_DATA);
  private readonly projects = signal<Project[]>(PROJECTS_DATA);
  private readonly studyProjects = signal<Project[]>(STUDY_PROJECTS_DATA);

  readonly allSkills = this.skills.asReadonly();
  readonly profileData = this.profile.asReadonly();
  readonly allProjects = this.projects.asReadonly();
  readonly allStudyProjects = this.studyProjects.asReadonly();

  getSkillsByCategory(category: Skill['category']): Skill[] {
    return this.skills().filter((s) => s.category === category);
  }

  getFeaturedProjects(): Project[] {
    return this.projects().filter((p) => p.featured);
  }
}

// Datos editables

const SKILLS_DATA: Skill[] = [
  { name: 'Angular', category: 'frontend', level: 4 },
  { name: 'TypeScript', category: 'frontend', level: 4 },
  { name: 'JavaScript', category: 'frontend', level: 4 },
  { name: 'HTML5', category: 'frontend', level: 4 },
  { name: 'CSS3', category: 'frontend', level: 4 },
  { name: 'Tailwind CSS', category: 'frontend', level: 4 },
  { name: 'RxJS', category: 'frontend', level: 3 },
  { name: 'Git', category: 'tools', level: 4 },
  { name: 'VS Code', category: 'tools', level: 5 },
  { name: 'Vitest', category: 'tools', level: 3 },
];

const PROJECTS_DATA: Project[] = [
  {
    id: 'portfolio',
    title: 'Portafolio Personal',
    description: 'Portafolio construido con Angular 21, SSR, Tailwind CSS v4 y arquitectura limpia. Diseño con glassmorphism, animaciones scroll-reveal y paleta violeta-rosa. Incluye CV integrado, modo responsivo y build optimizado con lazy loading.',
    techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'SSR'],
    imageUrl: 'assets/img/projects/portfolio.png',
    repoUrl: 'https://github.com/maikolgarcialorenzo2001-rgb/portfolio',
    featured: true,
  },
  {
    id: 'cine-verse',
    title: 'CineVerse',
    description: 'Explorador de películas con autenticación, playlists personalizadas y sincronación multiplataforma. Consume la API de TMDB mediante HttpClient con interceptors, usa Supabase como backend con PostgreSQL, tracking de errores con Sentry, y está containerizado con Docker + Nginx. SSR con Angular.',
    techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'SSR', 'Supabase', 'RxJS', 'Vitest'],
    imageUrl: 'assets/img/projects/cine-verse.png',
    repoUrl: 'https://github.com/maikolgarcialorenzo2001-rgb/Movies-APP',
    featured: true,
  },
  {
    id: 'eco-taxis',
    title: 'EcoTaxis',
    description: 'Gestión de alquiler de triciclos eléctricos en Viñales. Los usuarios buscan vehículos disponibles por filtros, hacen reservas y calculan tarifas en vivo. SSR para carga rápida.',
    techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'SSR', 'RxJS', 'Vitest'],
    imageUrl: 'assets/img/projects/eco-taxis.png',
    status: 'wip',
    repoUrl: 'https://github.com/maikolgarcialorenzo2001-rgb/Tricycle-Agency',
    featured: true,
  },
];

// Proyectos de estudio
const STUDY_PROJECTS_DATA: Project[] = [
  {
    id: 'study-galery',
    title: 'La Galería',
    description: 'Galería interactiva de fotos de continentes con categorías, lightbox para ver imágenes a pantalla completa y carrusel de navegación. Construida con JavaScript vanilla y Tailwind CSS.',
    techStack: ['JavaScript', 'Tailwind CSS', 'HTML5', 'Rollup'],
    imageUrl: 'assets/img/projects/galery.png',
    repoUrl: 'https://github.com/maikolgarcialorenzo2001-rgb/Study-Project-No.-1-Continents-Gallery',
    featured: false,
  },
  {
    id: 'study-bank',
    title: 'App de Banco',
    description: 'Simulador de transferencia bancaria en 4 pasos: datos del receptor, monto, método de pago y confirmación. Incluye barra de progreso, validación de formularios y temporizador de reinicio.',
    techStack: ['JavaScript', 'Tailwind CSS', 'HTML5', 'Rollup'],
    imageUrl: 'assets/img/projects/bank.png',
    repoUrl: 'https://github.com/maikolgarcialorenzo2001-rgb/Study-Project-No.-2-Bank-Transfer-App-Simulation',
    featured: false,
  },
  {
    id: 'study-shop',
    title: 'Tienda',
    description: 'Simulación de tienda online de zapatillas con selector de talle y color, carrito de compras, panel de reseñas, inicio de sesión y notificaciones en tiempo real. Todo con JavaScript vanilla.',
    techStack: ['JavaScript', 'Tailwind CSS', 'HTML5', 'Rollup'],
    imageUrl: 'assets/img/projects/shop.png',
    repoUrl: 'https://github.com/maikolgarcialorenzo2001-rgb/Study-Project-No.-3-Shop-Window-Simulation',
    featured: false,
  },
  {
    id: 'study-simple-movie',
    title: 'Simple-Movies App',
    description: 'Explorador de películas estilo Netflix con filtros por categoría, género, país y año. Buscador con sugerencias, panel de recomendaciones y overlay con info y tráiler. Usa Alpine.js para los dropdowns.',
    techStack: ['JavaScript', 'Tailwind CSS', 'Alpine.js', 'HTML5', 'Rollup'],
    imageUrl: 'assets/img/projects/simple-movie.png',
    repoUrl: 'https://github.com/maikolgarcialorenzo2001-rgb/Study-Project-4-Simple-Movie-App',
    featured: false,
  },
];

const PROFILE_DATA: Profile = {
  name: 'Maikol Garcia Lorenzo',
  title: 'Frontend Developer',
  subtitle: '',
  shortBio: 'Frontend developer autodidacta. 5 proyectos reales construidos desde cero.',
  bio: `Soy un desarrollador web Frontend autodidacta apasionado por la tecnología y el aprendizaje continuo. Actualmente me encuentro en busca de mi primera oportunidad profesional, con la motivación de demostrar que puedo aportar valor, adaptarme rápidamente y convertirme en un miembro eficiente de cualquier equipo.

Aunque todavía no cuento con experiencia laboral formal en el sector, he dedicado gran parte de mi tiempo a desarrollar proyectos personales que reflejan mis conocimientos, compromiso y capacidad para resolver problemas reales mediante el desarrollo web. Considero que estos proyectos hablan mejor de mis habilidades que cualquier descripción sobre mí mismo.

Me caracterizo por mi curiosidad, disciplina y disposición constante para aprender nuevas tecnologías, herramientas y metodologías. No temo salir de mi zona de confort cuando eso significa crecer profesionalmente y adquirir nuevas competencias.

Mi objetivo es seguir mejorando cada día como desarrollador, ampliar mis conocimientos tanto en frontend como en backend y, con el tiempo, convertirme en un desarrollador Full Stack capaz de participar en todas las etapas de creación de aplicaciones modernas y escalables.

Estoy convencido de que cada desafío representa una oportunidad para aprender, crecer y construir soluciones cada vez mejores.`,
  location: 'Viñales, Pinar del Río, Cuba',
  email: 'maikolgarcialorenzo2001@gmail.com',
  avatar: 'assets/img/me.png',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/maikolgarcialorenzo2001-rgb?tab=repositories', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/maikol-garcia-lorenzo-601978405/', icon: 'linkedin' },
    { platform: 'Email', url: 'mailto:maikolgarcialorenzo2001@gmail.com', icon: 'email' },
  ],
  experience: [],
  education: [
    {
      degree: 'Ingeniería Informática',
      institution: 'Universidad de Pinar del Río Hermanos Saíz',
      startDate: '2019',
      endDate: '2023',
      description: 'Formación en programación, algoritmos, estructuras de datos y bases de datos.',
    },
  ],
  certifications: [],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Básico' },
  ],
  stats: {
    yearsOfExperience: 0,
    projectsCompleted: 5,
    technologiesUsed: 10,
  },
};
