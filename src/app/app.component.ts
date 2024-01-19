import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TrCardComponent } from './components/tr-card/tr-card.component';
import { IInvoice } from './models/invoice';
import { TrFormComponent } from './components/tr-form/tr-form.component';
import { InvoiceService } from './services/invoice';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    TrCardComponent,
    TrFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading = signal(true);
  darkMode = signal(true);
  formMode = signal(false);
  data = signal<IInvoice[] | undefined>(undefined);
  currentData = signal<IInvoice | undefined>(undefined);

  pagPages = signal(0);
  currentPage = signal(1);
  searchedData = signal<IInvoice[] | undefined>(undefined);
  searchInput = new FormControl('');

  constructor() {
    void this.darkModeHandler();
    void this.dataHandler();

    this.searchedData.set(this.data());
    this.searchInput.valueChanges.subscribe((searchValue) => {
      if (searchValue === null) {
        return;
      }
      const valueLowercase = searchValue.toLowerCase();
      this.searchedData.set(this.data());
      this.searchedData.update((dataArray) =>
        dataArray?.filter(
          (data) =>
            data.transactionCode.includes(valueLowercase) ||
            data.transactionTotal.toString().includes(valueLowercase) ||
            data.transactionDate.includes(valueLowercase)
        )
      );
      this.pagPages.set(this.setPag(this.searchedData()?.length));
      this.currentPage.set(1);
    });
  }

  computedData = computed(() => {
    const currentPage = this.currentPage();
    const searchedData = this.searchedData();



    return searchedData?.slice((currentPage-1)*18, currentPage*18);
  });

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
    this.searchedData.set(this.data());
    this.pagPages.set(this.setPag(this.data()?.length));
    this.loading.set(false);
  }

  setPag(dataLenght?: number) {
    if (dataLenght === undefined) {
      return 1;
    }
    return Math.ceil(dataLenght / 18);
  }
}
