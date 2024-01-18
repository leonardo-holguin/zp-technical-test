import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { IInvoice } from '../../models/invoice';

@Component({
  selector: 'app-tr-form',
  standalone: true,
  imports: [],
  templateUrl: './tr-form.component.html',
  styleUrl: './tr-form.component.scss',
})
export class TrFormComponent {
  @Input() data?: IInvoice;
  @Output() closeForm = new EventEmitter();

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeForm.emit();
    }
  }

  formatDate(date: string | undefined | null): string | null {
    if (date === undefined || date === null) {
      return null;
    }

    const year = date.split('/')[2].split(' ')[0];
    let month = date.split('/')[1];
    let day = date.split('/')[0];

    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  formatTime(time: string | undefined | null): string | null {
    if (time === undefined || time === null) {
      return null;
    }

    let hour = time.split(':')[0].split(' ')[1];
    let minute = time.split(':')[1];
    let second = time.split(':')[2].split(' ')[0];

    if (hour.length === 1) {
      hour = '0' + hour;
    }
    if (minute.length === 1) {
      minute = '0' + minute;
    }
    if (second.length === 1) {
      second = '0' + second;
    }

    return `${hour}:${minute}:${second}`;
  }
}
