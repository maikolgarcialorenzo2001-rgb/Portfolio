import { Component, DestroyRef, inject, signal, afterNextRender, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-nav-menu',
  imports: [],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.css',
})
export class NavMenu {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private rafId: number | null = null;
  private scrollHandler: (() => void) | null = null;
  private readonly HEADER_OFFSET = 96;
  private readonly SCROLL_SECTIONS = ['hero', 'about', 'projects', 'skills', 'cv'];

  readonly activeSection = signal<string>('home');
  readonly mobileOpen = signal(false);
  readonly t = this.translate.t.bind(this.translate);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const sub = this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => this.syncActiveFromRoute());

      this.destroyRef.onDestroy(() => sub.unsubscribe());
      afterNextRender(() => this.setupScrollDetection());
    }
  }

  toggleMobileMenu(): void {
    this.mobileOpen.update((v) => !v);
    document.body.style.overflow = this.mobileOpen() ? 'hidden' : '';
  }

  private syncActiveFromRoute(): void {
    const url = this.router.url;

    if (url === '/' || url.startsWith('/#')) {
      this.setupScrollDetection();
    } else {
      this.teardownScrollDetection();
      this.activeSection.set(url.startsWith('/projects') ? 'projects' : 'home');
    }
  }

  /** Remove scroll listener and pending rAF */
  private teardownScrollDetection(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private setupScrollDetection(): void {
    this.teardownScrollDetection(); // evita acumular listeners

    this.scrollHandler = () => {
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null;
        this.detectActiveSection(this.SCROLL_SECTIONS, this.HEADER_OFFSET);
      });
    };

    // Initial detection
    this.detectActiveSection(this.SCROLL_SECTIONS, this.HEADER_OFFSET);

    // Listen with passive for performance
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.destroyRef.onDestroy(() => this.teardownScrollDetection());
  }

  private detectActiveSection(sections: string[], headerOffset: number): void {
    let current = 'home';
    let closestDist = Infinity;

    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();

      // Buscamos la sección cuyo top esté MÁS CERCA del header,
      // ya esté arriba (scrolleada) o abajo (por scrollear).
      // Esto es más robusto que buscar solo las que están arriba.
      const dist = Math.abs(rect.top - headerOffset);
      if (dist < closestDist) {
        closestDist = dist;
        current = id === 'hero' ? 'home' : id;
      }
    }

    this.activeSection.set(current);
  }

  scrollTo(section: string): void {
    this.mobileOpen.set(false);
    document.body.style.overflow = '';

    if (this.router.url !== '/') {
      void this.router.navigate(['/'], { fragment: section });
      return;
    }

    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', `/#${section}`);
      this.activeSection.set(section === 'hero' ? 'home' : section);
    }
  }
}
