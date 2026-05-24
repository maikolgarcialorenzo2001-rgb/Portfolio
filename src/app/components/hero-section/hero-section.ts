import { Component, inject, signal, afterNextRender, DestroyRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  private readonly content = inject(ContentService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  readonly profile = this.content.profileData;
  readonly currentPhrase = signal('');

  private readonly phrases = [
    'Construyo con Angular',
    'Cada proyecto es una lección',
    'Busco mi primer equipo',
  ];
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => this.startTyping());
    }
  }

  private startTyping(): void {
    this.type();
    this.destroyRef.onDestroy(() => {
      if (this.typingTimer) clearTimeout(this.typingTimer);
    });
  }

  private type(): void {
    const current = this.phrases[this.phraseIndex];

    this.charIndex += this.isDeleting ? -1 : 1;
    this.currentPhrase.set(current.substring(0, this.charIndex));

    let delay = this.isDeleting ? 30 : 60;

    if (!this.isDeleting && this.charIndex === current.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      delay = 600;
    }

    this.typingTimer = setTimeout(() => this.type(), delay);
  }

  scrollToCV(): void {
    const el = document.getElementById('cv');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', '/#cv');
    }
  }
}
