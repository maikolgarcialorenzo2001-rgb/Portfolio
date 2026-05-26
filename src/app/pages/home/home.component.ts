import { Component, AfterViewInit, inject, signal, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroSection } from '../../components/hero-section/hero-section';
import { AboutSection } from '../../components/about-section/about-section';
import { SkillsPreview } from '../../components/skills-preview/skills-preview';
import { ProjectsPreview } from '../../components/projects-preview/projects-preview';
import { CvSection } from '../../components/cv-section/cv-section';
import { Footer } from '../../components/footer/footer';
import { TranslateService } from '../../services/translate.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    AboutSection,
    SkillsPreview,
    ProjectsPreview,
    CvSection,
    Footer,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);

  readonly showScrollIndicator = signal(true);
  readonly t = this.translate.t.bind(this.translate);

  constructor() {
    this.seo.setPageMeta({
      title: 'Frontend Developer',
      description: 'Portafolio de Maikol Garcia Lorenzo — Frontend Developer especializado en Angular, TypeScript y arquitectura limpia. Proyectos reales construidos desde cero.',
      keywords: 'frontend developer, angular, typescript, portfolio, desarrollador web, cuba',
      ogImage: '/assets/img/og-placeholder.svg',
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollReveal();
      this.setupScrollIndicator();
    }
  }

  scrollToNext(): void {
    const sections = ['about', 'projects', 'skills', 'cv'];

    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top > 100) {
        el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  }

  private setupScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);
  }

  private setupScrollIndicator(): void {
    const checkFooterVisibility = (): void => {
      const footer = document.querySelector('app-footer');
      if (!footer) {
        this.showScrollIndicator.set(true);
        return;
      }
      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight;
      this.showScrollIndicator.set(rect.top >= vh || rect.bottom <= 0);
    };

    checkFooterVisibility();

    window.addEventListener('scroll', checkFooterVisibility, { passive: true });
    this.destroyRef.onDestroy(() =>
      window.removeEventListener('scroll', checkFooterVisibility),
    );
  }
}
