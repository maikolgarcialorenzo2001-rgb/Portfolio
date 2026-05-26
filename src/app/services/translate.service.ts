import { Injectable, signal } from '@angular/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly lang = signal<Lang>('en');
  readonly currentLang = this.lang.asReadonly();

  private readonly dict: Record<string, { es: string; en: string }> = {
    // Nav
    'nav.home':        { es: 'Inicio',         en: 'Home' },
    'nav.about':       { es: 'Sobre mí',       en: 'About Me' },
    'nav.projects':    { es: 'Proyectos',      en: 'Projects' },
    'nav.skills':      { es: 'Skills',         en: 'Skills' },
    'nav.cv':          { es: 'CV',             en: 'Resume' },
    'nav.menu_label':  { es: 'Menú de navegación', en: 'Navigation menu' },

    // Hero
    'hero.available':  { es: 'Disponible para nuevos proyectos', en: 'Available for new projects' },
    'hero.view_cv':    { es: 'Ver CV',         en: 'View Resume' },
    'hero.contact_me': { es: 'Contáctame',     en: 'Contact Me' },

    // About
    'about.section_label':      { es: 'Sobre mí',       en: 'About Me' },
    'about.title':              { es: 'Conoce a quien está detrás del código', en: 'Meet the person behind the code' },
    'about.stats.projects':     { es: 'Proyectos',      en: 'Projects' },
    'about.stats.technologies': { es: 'Tecnologías',    en: 'Technologies' },
    'about.experience_title':   { es: 'Experiencia Profesional', en: 'Professional Experience' },
    'about.present':            { es: 'Actualidad',     en: 'Present' },

    // Skills
    'skills.section_label':     { es: 'Skills',             en: 'Skills' },
    'skills.title':             { es: 'Tecnologías que domino', en: 'Technologies I master' },
    'skills.description':       { es: 'Herramientas con las que construyo productos reales, todos los días.', en: 'Tools I use to build real products, every day.' },
    'skills.category.frontend': { es: 'Frontend',           en: 'Frontend' },
    'skills.category.tools':    { es: 'Herramientas',       en: 'Tools' },

    // Projects
    'projects.section_label': { es: 'Proyectos',       en: 'Projects' },
    'projects.title':         { es: 'Trabajos que hablan solos', en: 'Work that speaks for itself' },
    'projects.description':   { es: 'Cada proyecto es una historia de decisiones técnicas, código limpio y resultados concretos.', en: 'Each project is a story of technical decisions, clean code, and concrete results.' },
    'projects.status.demo':   { es: 'Demo',            en: 'Demo' },
    'projects.status.wip':    { es: 'En desarrollo',   en: 'In Development' },
    'projects.view_github':   { es: 'Examinar en GitHub', en: 'View on GitHub' },
    'projects.repo_private':  { es: 'Repo privado / no disponible', en: 'Private repo / not available' },
    'projects.intro':         { es: 'Te invito a conocer mis proyectos. No son perfectos, pero reflejan de forma honesta mi evolución como desarrollador. Cada uno representa nuevos aprendizajes, desafíos superados y habilidades adquiridas. Más que proyectos, son la evidencia de mi crecimiento, mi esfuerzo constante y mi compromiso con seguir aprendiendo cada día.', en: "I invite you to explore my projects. They aren't perfect, but they honestly reflect my evolution as a developer. Each one represents new learnings, challenges overcome, and skills acquired. More than projects, they are evidence of my growth, my constant effort, and my commitment to keep learning every day." },
    'projects.study_button':  { es: 'Proyectos de estudio', en: 'Study Projects' },

    // CV / Resume
    'cv.section_label': { es: 'Curriculum',              en: 'Resume' },
    'cv.title':         { es: 'Mi Trayectoria',          en: 'My Journey' },
    'cv.description':   { es: 'Toda mi experiencia profesional, formación y habilidades en un solo lugar.', en: 'All my professional experience, education, and skills in one place.' },
    'cv.download':      { es: 'Descargar CV en PDF',     en: 'Download Resume (PDF)' },

    // Project descriptions
    'project.title.portfolio':    { es: 'Portafolio Personal',    en: 'Personal Portfolio' },
    'project.title.cine-verse':  { es: 'CineVerse',               en: 'CineVerse' },
    'project.title.eco-taxis':   { es: 'EcoTaxis',                en: 'EcoTaxis' },
    'project.title.study-galery':  { es: 'La Galería',            en: 'The Gallery' },
    'project.title.study-bank':    { es: 'App de Banco',          en: 'Bank App' },
    'project.title.study-shop':    { es: 'Tienda',                en: 'Store' },
    'project.title.study-simple-movie': { es: 'Simple-Movies App', en: 'Simple-Movies App' },

    'project.desc.portfolio':   { es: 'Portafolio construido con Angular 21, SSR, Tailwind CSS v4 y arquitectura limpia. Diseño con glassmorphism, animaciones scroll-reveal y paleta violeta-rosa. Incluye CV integrado, modo responsivo y build optimizado con lazy loading.', en: 'Portfolio built with Angular 21, SSR, Tailwind CSS v4 and clean architecture. Glassmorphism design, scroll-reveal animations, and a violet-rose palette. Includes integrated CV, responsive mode, and optimized build with lazy loading.' },
    'project.desc.cine-verse':  { es: 'Explorador de películas con autenticación, playlists personalizadas y sincronación multiplataforma. Consume la API de TMDB mediante HttpClient con interceptors, usa Supabase como backend con PostgreSQL, tracking de errores con Sentry, y está containerizado con Docker + Nginx. SSR con Angular.', en: 'Movie explorer with authentication, custom playlists, and cross-platform sync. Consumes the TMDB API via HttpClient with interceptors, uses Supabase as backend with PostgreSQL, error tracking with Sentry, and is containerized with Docker + Nginx. SSR with Angular.' },
    'project.desc.eco-taxis':   { es: 'Gestión de alquiler de triciclos eléctricos en Viñales. Los usuarios buscan vehículos disponibles por filtros, hacen reservas y calculan tarifas en vivo. SSR para carga rápida.', en: 'Electric tricycle rental management in Viñales. Users search available vehicles by filters, make reservations, and calculate live rates. SSR for fast loading.' },
    'project.desc.study-galery':  { es: 'Galería interactiva de fotos de continentes con categorías, lightbox para ver imágenes a pantalla completa y carrusel de navegación. Construida con JavaScript vanilla y Tailwind CSS.', en: 'Interactive photo gallery of continents with categories, lightbox for full-screen images, and navigation carousel. Built with vanilla JavaScript and Tailwind CSS.' },
    'project.desc.study-bank':    { es: 'Simulador de transferencia bancaria en 4 pasos: datos del receptor, monto, método de pago y confirmación. Incluye barra de progreso, validación de formularios y temporizador de reinicio.', en: 'Bank transfer simulator in 4 steps: receiver details, amount, payment method, and confirmation. Includes progress bar, form validation, and reset timer.' },
    'project.desc.study-shop':    { es: 'Simulación de tienda online de zapatillas con selector de talle y color, carrito de compras, panel de reseñas, inicio de sesión y notificaciones en tiempo real. Todo con JavaScript vanilla.', en: 'Sneaker online store simulation with size and color selector, shopping cart, reviews panel, login, and real-time notifications. All with vanilla JavaScript.' },
    'project.desc.study-simple-movie': { es: 'Explorador de películas estilo Netflix con filtros por categoría, género, país y año. Buscador con sugerencias, panel de recomendaciones y overlay con info y tráiler. Usa Alpine.js para los dropdowns.', en: 'Netflix-style movie explorer with filters by category, genre, country, and year. Search with suggestions, recommendations panel, and overlay with info and trailer. Uses Alpine.js for dropdowns.' },

    // Footer
    'footer.back_to_top': { es: 'Volver arriba',         en: 'Back to top' },

    // Study projects
    'study.section_label': { es: 'Estudio',         en: 'Study' },
    'study.title':         { es: 'Proyectos de aprendizaje', en: 'Learning Projects' },
    'study.description':   { es: 'Cada proyecto refleja un escalón en mi evolución como desarrollador. De principiante a código limpio, el camino se ve aquí.', en: 'Each project reflects a step in my evolution as a developer. From beginner to clean code, the journey is visible here.' },
    'study.back':          { es: 'Volver',           en: 'Back' },

    // Home scroll
    'home.scroll': { es: 'Scroll', en: 'Scroll' },

    // Content
    'content.short_bio': {
      es: 'Frontend developer autodidacta. 5 proyectos reales construidos desde cero.',
      en: 'Self-taught frontend developer. 5 real projects built from scratch.',
    },
    'content.bio': {
      es: `Soy un desarrollador web Frontend autodidacta apasionado por la tecnología y el aprendizaje continuo. Actualmente me encuentro en busca de mi primera oportunidad profesional, con la motivación de demostrar que puedo aportar valor, adaptarme rápidamente y convertirme en un miembro eficiente de cualquier equipo.

Aunque todavía no cuento con experiencia laboral formal en el sector, he dedicado gran parte de mi tiempo a desarrollar proyectos personales que reflejan mis conocimientos, compromiso y capacidad para resolver problemas reales mediante el desarrollo web. Considero que estos proyectos hablan mejor de mis habilidades que cualquier descripción sobre mí mismo.

Me caracterizo por mi curiosidad, disciplina y disposición constante para aprender nuevas tecnologías, herramientas y metodologías. No temo salir de mi zona de confort cuando eso significa crecer profesionalmente y adquirir nuevas competencias.

Mi objetivo es seguir mejorando cada día como desarrollador, ampliar mis conocimientos tanto en frontend como en backend y, con el tiempo, convertirme en un desarrollador Full Stack capaz de participar en todas las etapas de creación de aplicaciones modernas y escalables.

Estoy convencido de que cada desafío representa una oportunidad para aprender, crecer y construir soluciones cada vez mejores.`,
      en: `I am a self-taught Frontend web developer passionate about technology and continuous learning. I am currently looking for my first professional opportunity, motivated to prove that I can bring value, adapt quickly, and become an efficient member of any team.

Although I do not yet have formal work experience in the industry, I have dedicated much of my time to developing personal projects that reflect my knowledge, commitment, and ability to solve real problems through web development. I believe these projects speak better about my skills than any description of myself.

I am characterized by my curiosity, discipline, and constant willingness to learn new technologies, tools, and methodologies. I am not afraid to step out of my comfort zone when it means growing professionally and acquiring new skills.

My goal is to keep improving every day as a developer, expand my knowledge in both frontend and backend, and over time become a Full Stack developer capable of participating in all stages of building modern and scalable applications.

I am convinced that every challenge represents an opportunity to learn, grow, and build better solutions.`,
    },
  };

  switchLang(): void {
    this.lang.update(l => (l === 'es' ? 'en' : 'es'));
  }

  t(key: string): string {
    return this.dict[key]?.[this.lang()] ?? key;
  }

  /** CV filename without extension — syncs with the current language */
  cvFile(): string {
    return this.lang() === 'es' ? 'es' : 'en';
  }

  /** Typewriter phrases — switch with language */
  getPhrases(): string[] {
    return this.lang() === 'es'
      ? ['Construyo con Angular', 'Cada proyecto es una lección', 'Busco mi primer equipo']
      : ['I build with Angular', 'Every project is a lesson', 'Looking for my first team'];
  }
}
