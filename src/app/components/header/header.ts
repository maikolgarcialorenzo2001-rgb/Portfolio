import { Component, inject } from '@angular/core';
import { NavMenu } from '../nav-menu/nav-menu';
import { ContentService } from '../../services/content.service';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-header',
  imports: [NavMenu, Contact],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly content = inject(ContentService)

  readonly profile = this.content.profileData

}
