import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { LangSwitcher } from './components/lang-switcher/lang-switcher';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LangSwitcher, ThemeToggle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
