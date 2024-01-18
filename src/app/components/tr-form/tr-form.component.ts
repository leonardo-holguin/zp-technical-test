import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IInvoice } from '../../models/invoice';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IInvoiceServerDTO } from '../../models/dto/invoice.server.dto';

@Component({
  selector: 'app-tr-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tr-form.component.html',
  styleUrl: './tr-form.component.scss',
})
export class TrFormComponent implements OnChanges {
  @Input() data?: IInvoice;
  @Output() closeForm = new EventEmitter();

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeForm.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    changes;
    this.transactionCodeCtrl.setValue(this.data?.transactionCode);
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  transactionCodeCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  saveData() {
    if (
      !this.transactionCodeCtrl.valid ||
      this.transactionCodeCtrl.value == '-1'
    ) {
      this.Toast.fire({
        icon: 'error',
        title: 'Código de transacción no válido',
      });
      return;
    }
    console.log(this.transactionCodeCtrl.value);
    console.log('guardar info');
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
