import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IInvoiceServerDTO } from './models/dto/invoice.server.dto';
import { TrCardComponent } from './components/tr-card/tr-card.component';
import { IInvoice } from './models/invoice';
import { PAYMENT_METHOD, TRANSACTION_STATUS } from './models/transaction';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TrCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading = signal(true);
  darkMode = signal(true);
  data = signal<IInvoice[] | undefined>(undefined);

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
    let resetedData: IInvoice[];
    const localData = localStorage.getItem('data');
    if (localData !== null) {
      resetedData = await this.resetDataInformation(JSON.parse(localData));
    } else {
      const serverData = await this.getServerData();
      resetedData = await this.resetDataInformation(serverData);
      localStorage.setItem('data', JSON.stringify(serverData));
    }
    this.data.set(resetedData);
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

  async resetDataInformation(data: IInvoiceServerDTO[]): Promise<IInvoice[]> {
    const resetedData: IInvoice[] = [];
    for (const invoice in data) {
      const newData: IInvoice = {
        id: crypto.randomUUID(),
        companyCode: data[invoice].comercio_codigo,
        companyName: data[invoice].comercio_nombre,
        companyId: data[invoice].comercio_nit,
        companyAddress: data[invoice].comercio_direccion,
        transactionCode: data[invoice].Trans_codigo,
        transactionPaymentMethod: this.getTransactionPaymentMethod(
          data[invoice].Trans_medio_pago
        ),
        transactionStatus: this.getTransactionStatus(
          data[invoice].Trans_estado
        ),
        transactionTotal: data[invoice].Trans_total,
        transactionDate: data[invoice].Trans_fecha,
        transactionConcept: data[invoice].Trans_concepto,
        userId: data[invoice].usuario_identificacion,
        userName: data[invoice].usuario_nombre,
        userEmail: data[invoice].usuario_email,
      };
      resetedData.push(newData);
    }
    return resetedData;
  }

  private getTransactionPaymentMethod(
    paymentMethodCode: number
  ): PAYMENT_METHOD {
    if (paymentMethodCode == 32) {
      return PAYMENT_METHOD.CREDIT_CARD;
    } else if (paymentMethodCode == 29) {
      return PAYMENT_METHOD.PSE;
    } else if (paymentMethodCode == 41) {
      return PAYMENT_METHOD.GANA;
    } else if (paymentMethodCode == 42) {
      return PAYMENT_METHOD.CASH_REGISTER;
    }
    return PAYMENT_METHOD.UNDEFINED;
  }

  private getTransactionStatus(
    transactionStatusCode: number
  ): TRANSACTION_STATUS {
    if (transactionStatusCode == 1) {
      return TRANSACTION_STATUS.APPROVED;
    } else if (transactionStatusCode == 1000) {
      return TRANSACTION_STATUS.REJECTED;
    } else if (transactionStatusCode == 999) {
      return TRANSACTION_STATUS.PENDING;
    }
    return TRANSACTION_STATUS.UNDEFINED;
  }
}
