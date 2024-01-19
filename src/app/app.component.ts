import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IInvoiceServerDTO } from './models/dto/invoice.server.dto';
import { TrCardComponent } from './components/tr-card/tr-card.component';
import { IInvoice } from './models/invoice';
import { PAYMENT_METHOD, TRANSACTION_STATUS } from './models/transaction';
import { TrFormComponent } from './components/tr-form/tr-form.component';
import { InvoiceService } from './services/invoice';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TrCardComponent, TrFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading = signal(true);
  darkMode = signal(true);
  formMode = signal(false);
  data = signal<IInvoice[] | undefined>(undefined);
  currentData = signal<IInvoice | undefined>(undefined);

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
    let resetedData = await InvoiceService._getData();
    this.data.set(resetedData);
    this.loading.set(false);
  }
}
