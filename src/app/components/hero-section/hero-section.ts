import { Component, inject, signal, afterNextRender, DestroyRef, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  private readonly content = inject(ContentService);
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  readonly profile = this.content.profileData;
  readonly currentPhrase = signal('');
  readonly copiedEmail = signal(false);
  readonly t = this.translate.t.bind(this.translate);

  private phrases: string[] = [];
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.phrases = this.translate.getPhrases();
      afterNextRender(() => this.startTyping());

      effect(() => {
        this.translate.currentLang();
        if (isPlatformBrowser(this.platformId)) {
          this.restartTyping();
        }
      });
    }
  }

  private restartTyping(): void {
    this.phrases = this.translate.getPhrases();
    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.currentPhrase.set('');

    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }

    setTimeout(() => this.type(), 300);
  }

  private startTyping(): void {
    this.type();
    this.destroyRef.onDestroy(() => {
      if (this.typingTimer) clearTimeout(this.typingTimer);
    });
  }

  private type(): void {
    const current = this.phrases[this.phraseIndex];
    if (!current) return;

    this.charIndex += this.isDeleting ? -1 : 1;
    this.currentPhrase.set(current.substring(0, this.charIndex));

    let delay = this.isDeleting ? 30 : 60;

    if (!this.isDeleting && this.charIndex === current.length) {
      delay = 5000;
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

  copyEmail(): void {
    navigator.clipboard.writeText(this.profile().email);
    this.copiedEmail.set(true);
    setTimeout(() => this.copiedEmail.set(false), 2000);
  }
}
