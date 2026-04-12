import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavbarComponent],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.applyTheme();
  }
}