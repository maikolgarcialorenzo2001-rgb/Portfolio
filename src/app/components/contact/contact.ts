import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly content = inject(ContentService);
  readonly socialLinks = this.content.profileData().socialLinks;
}
