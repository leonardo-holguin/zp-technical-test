import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isBrowser = false;
  loading = signal(false);
  darkMode = signal(true);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const currentDarkMode = localStorage.getItem('darkMode');
      if (currentDarkMode) {
        this.darkMode.set(currentDarkMode.toLowerCase() === 'true');
      } else {
        this.darkMode.set(
          window.matchMedia('(prefers-color-scheme: dark)').matches
        );
      }
    }
  }

  toggleDarkMode(): void {
    const currentValue: boolean = this.darkMode();
    this.darkMode.set(!currentValue);
    localStorage.setItem('darkMode', (!currentValue).toString());
  }

  async getServerData(): Promise<void> {
    let tries = 0;

    while (tries < 10 && this.loading()) {
      try {
        const response = await fetch(
          'http://pbiz.zonavirtual.com/api/Prueba/Consulta',
          {
            method: 'POST',
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
            },
          }
        );
        const json = (await response.json()) as Promise<
          { comercio_codigo: string }[]
        >;
        console.log('entra2');
        console.log(json);
        this.loading.set(true);
      } catch (error) {
        this.loading.set(false);
      }
      tries++;
    }
  }
}
