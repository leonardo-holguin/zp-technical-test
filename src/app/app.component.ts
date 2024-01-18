import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IInvoiceServerDTO } from './models/dto/invoice.server.dto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading = signal(true);
  darkMode = signal(true);
  data = signal<IInvoiceServerDTO[] | undefined>(undefined);

  constructor() {
    void this.darkModeHandler();
    void this.dataHandler();
  }

  async darkModeHandler() {
    const currentDarkMode = localStorage.getItem('darkMode');
    if (currentDarkMode) {
      this.darkMode.set(currentDarkMode.toLowerCase() === 'true');
    } else {
      this.darkMode.set(
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
  }

  toggleDarkMode(): void {
    const currentValue: boolean = this.darkMode();
    this.darkMode.set(!currentValue);
    localStorage.setItem('darkMode', (!currentValue).toString());
  }

  async dataHandler() {
    this.loading.set(true);
    const localData = localStorage.getItem('data');
    if (localData !== null) {
      this.data.set(JSON.parse(localData));
    } else {
      const serverData = await this.getServerData();
      this.data.set(serverData);
      localStorage.setItem('data', JSON.stringify(serverData));
    }
    this.loading.set(false);
  }

  async getServerData(): Promise<IInvoiceServerDTO[]> {
    let dataObtained = false;
    let data: IInvoiceServerDTO[] = [];

    while (!dataObtained) {
      try {
        const response = await fetch('https://zpttproxy.assoft.co/', {
          method: 'GET',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        });
        const json = (await response.json()) as Promise<
          IInvoiceServerDTO[] | { Message: string }
        >;

        if (Array.isArray(json)) {
          data = json;
          dataObtained = true;
        }
      } catch (error) {
        dataObtained = false;
      }
    }

    return data;
  }
}
