import { Component, Input } from '@angular/core';
import { IInvoice } from '../../models/invoice';
import { PAYMENT_METHOD } from '../../models/transaction';

@Component({
  selector: 'app-tr-card',
  standalone: true,
  imports: [],
  templateUrl: './tr-card.component.html',
  styleUrl: './tr-card.component.scss'
})
export class TrCardComponent {
  @Input() data?: IInvoice;

  formatCurrency(amount: number | undefined): string {
    if (amount === undefined) {
      return '$ --';
    }
    return amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
}
