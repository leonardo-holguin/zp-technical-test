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
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TrFormComponentFormCtrl } from './classes/form-controllers';
import {
  TrFormComponentFormValidator,
  VALIDATION_ERROR,
} from './classes/form-validator';
import { InvoiceService } from '../../services/invoice';

@Component({
  selector: 'app-tr-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tr-form.component.html',
  styleUrl: './tr-form.component.scss',
})
export class TrFormComponent
  extends TrFormComponentFormCtrl
  implements OnChanges
{
  currentTrCode?: string;

  @Input() data?: IInvoice;
  @Input() allData?: IInvoice[];
  @Output() closeForm = new EventEmitter();

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeForm.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    changes;

    this.currentTrCode = this.data?.transactionCode;

    this.transactionCodeCtrl.setValue(this.data?.transactionCode);
    this.transactionTotalCtrl.setValue(this.data?.transactionTotal);
    this.transactionDateCtrl.setValue(
      this.formatDate(this.data?.transactionDate)
    );
    this.transactionTimeCtrl.setValue(
      this.formatTime(this.data?.transactionDate)
    );
    this.transactionPaymentMethodCtrl.setValue(
      this.data?.transactionPaymentMethod
    );
    this.transactionStatusCtrl.setValue(this.data?.transactionStatus);
    this.transactionConceptCtrl.setValue(this.data?.transactionConcept);

    this.companyCodeCtrl.setValue(this.data?.companyCode);
    this.companyIdCtrl.setValue(this.data?.companyId);
    this.companyNameCtrl.setValue(this.data?.companyName);
    this.companyAddressCtrl.setValue(this.data?.companyAddress);

    this.userIdCtrl.setValue(this.data?.userId);
    this.userNameCtrl.setValue(this.data?.userName);
    this.userEmailCtrl.setValue(this.data?.userEmail);
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

  saveData() {
    const errorFlow = TrFormComponentFormValidator.validateFormData({
      transactionCodeCtrl: this.transactionCodeCtrl,
      transactionTotalCtrl: this.transactionTotalCtrl,
      transactionDateCtrl: this.transactionDateCtrl,
      transactionTimeCtrl: this.transactionTimeCtrl,
      transactionPaymentMethodCtrl: this.transactionPaymentMethodCtrl,
      transactionStatusCtrl: this.transactionStatusCtrl,
      transactionConceptCtrl: this.transactionConceptCtrl,
      companyCodeCtrl: this.companyCodeCtrl,
      companyIdCtrl: this.companyIdCtrl,
      companyNameCtrl: this.companyNameCtrl,
      companyAddressCtrl: this.companyAddressCtrl,
      userIdCtrl: this.userIdCtrl,
      userNameCtrl: this.userNameCtrl,
      userEmailCtrl: this.userEmailCtrl,
    });

    if (errorFlow === undefined) {
      this.handleNewData();
      return;
    }

    if (errorFlow === VALIDATION_ERROR.TRANSACTION_CODE) {
      this.Toast.fire({
        icon: 'error',
        title: 'Código de la transacción no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.TRANSACTION_TOTAL) {
      this.Toast.fire({
        icon: 'error',
        title: 'Total de la transacción no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.TRANSACTION_DATE) {
      this.Toast.fire({
        icon: 'error',
        title: 'Fecha de la transacción no válida',
      });
    } else if (errorFlow === VALIDATION_ERROR.TRANSACTION_TIME) {
      this.Toast.fire({
        icon: 'error',
        title: 'Hora de la transacción no válida',
      });
    } else if (errorFlow === VALIDATION_ERROR.TRANSACTION_PAYMENT_METHOD) {
      this.Toast.fire({
        icon: 'error',
        title: 'Medio de pago no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.TRANSACTION_STATUS) {
      this.Toast.fire({
        icon: 'error',
        title: 'Estado de la transacción no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.TRANSACTION_CONCEPT) {
      this.Toast.fire({
        icon: 'error',
        title: 'Concepto de la transacción no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.COMPANY_CODE) {
      this.Toast.fire({
        icon: 'error',
        title: 'Código del comercio no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.COMPANY_ID) {
      this.Toast.fire({
        icon: 'error',
        title: 'NIT del comercio no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.COMPANY_NAME) {
      this.Toast.fire({
        icon: 'error',
        title: 'Nombre del comercio no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.COMPANY_ADDRESS) {
      this.Toast.fire({
        icon: 'error',
        title: 'Dirección del comercio no válida',
      });
    } else if (errorFlow === VALIDATION_ERROR.USER_ID) {
      this.Toast.fire({
        icon: 'error',
        title: 'Identificación del usuario no válida',
      });
    } else if (errorFlow === VALIDATION_ERROR.USER_NAME) {
      this.Toast.fire({
        icon: 'error',
        title: 'Nombre del usuario no válido',
      });
    } else if (errorFlow === VALIDATION_ERROR.USER_EMAIL) {
      this.Toast.fire({
        icon: 'error',
        title: 'Email del usuario no válido',
      });
    }
  }

  async handleNewData() {
    if (
      !this.allData ||
      this.transactionCodeCtrl.value === undefined ||
      this.transactionTotalCtrl.value === undefined ||
      this.transactionDateCtrl.value === undefined ||
      this.transactionTimeCtrl.value === undefined ||
      this.transactionPaymentMethodCtrl.value === undefined ||
      this.transactionStatusCtrl.value === undefined ||
      this.transactionConceptCtrl.value === undefined ||
      this.companyCodeCtrl.value === undefined ||
      this.companyIdCtrl.value === undefined ||
      this.companyNameCtrl.value === undefined ||
      this.companyAddressCtrl.value === undefined ||
      this.userIdCtrl.value === undefined ||
      this.userNameCtrl.value === undefined ||
      this.userEmailCtrl.value === undefined
    ) {
      return;
    }

    const dateFormatter = (date: string, time: string): string => {
      let [hour, minute, second] = time.split(':');
      let hourIn12 = Number(hour) % 12 || 12;
      let period = Number(hour) >= 12 ? 'p.m.' : 'a.m.';
      const formatTime = `${hourIn12}:${minute}:${second} ${period}`;

      return `${date.split('-')[2]}/${date.split('-')[1]}/${
        date.split('-')[0]
      } ${formatTime}`;
    };

    if (this.data?.id === undefined) {
      for (const data in this.allData) {
        if (
          this.allData[data].transactionCode == this.transactionCodeCtrl.value
        ) {
          this.Toast.fire({
            icon: 'error',
            title:
              'Ya existe una transacción con código #' +
              this.allData[data].transactionCode,
          });
          return;
        }
      }
      const response = await InvoiceService._addTransaction({
        comercio_codigo: this.companyCodeCtrl.value,
        comercio_nombre: this.companyNameCtrl.value,
        comercio_nit: this.companyIdCtrl.value,
        comercio_direccion: this.companyAddressCtrl.value,
        Trans_codigo: this.transactionCodeCtrl.value,
        Trans_medio_pago: InvoiceService._PaymentMethodConvertion(
          this.transactionPaymentMethodCtrl.value
        ),
        Trans_estado: InvoiceService._TransactionStatusConvertion(
          this.transactionStatusCtrl.value
        ),
        Trans_total: this.transactionTotalCtrl.value,
        Trans_fecha: dateFormatter(
          this.transactionDateCtrl.value,
          this.transactionTimeCtrl.value
        ),
        Trans_concepto: this.transactionConceptCtrl.value,
        usuario_identificacion: this.userIdCtrl.value,
        usuario_nombre: this.userNameCtrl.value,
        usuario_email: this.userEmailCtrl.value,
      });
      this.allData.unshift(response);
      this.Toast.fire({
        icon: 'success',
        title:
          'Transacción creada con código #' + this.transactionCodeCtrl.value,
      });
      this.data = undefined;
      this.closeForm.emit();
    } else if (this.currentTrCode) {
      for (const data in this.allData) {
        if (
          this.allData[data].transactionCode ==
            this.transactionCodeCtrl.value &&
          this.allData[data].id !== this.data.id
        ) {
          this.Toast.fire({
            icon: 'error',
            title:
              'Ya existe una transacción con código #' +
              this.allData[data].transactionCode,
          });
          return;
        }
      }
      const response = await InvoiceService._updateTransaction(
        this.currentTrCode,
        {
          comercio_codigo: this.companyCodeCtrl.value,
          comercio_nombre: this.companyNameCtrl.value,
          comercio_nit: this.companyIdCtrl.value,
          comercio_direccion: this.companyAddressCtrl.value,
          Trans_codigo: this.transactionCodeCtrl.value,
          Trans_medio_pago: InvoiceService._PaymentMethodConvertion(
            this.transactionPaymentMethodCtrl.value
          ),
          Trans_estado: InvoiceService._TransactionStatusConvertion(
            this.transactionStatusCtrl.value
          ),
          Trans_total: this.transactionTotalCtrl.value,
          Trans_fecha: dateFormatter(
            this.transactionDateCtrl.value,
            this.transactionTimeCtrl.value
          ),
          Trans_concepto: this.transactionConceptCtrl.value,
          usuario_identificacion: this.userIdCtrl.value,
          usuario_nombre: this.userNameCtrl.value,
          usuario_email: this.userEmailCtrl.value,
        }
      );
      const tr = this.allData.find(
        (item) => item.transactionCode === this.currentTrCode
      );
      if (tr) {
        tr.id = response.id;
        tr.companyCode = response.companyCode;
        tr.companyName = response.companyName;
        tr.companyId = response.companyId;
        tr.companyAddress = response.companyAddress;
        tr.transactionCode = response.transactionCode;
        tr.transactionPaymentMethod = response.transactionPaymentMethod;
        tr.transactionStatus = response.transactionStatus;
        tr.transactionTotal = response.transactionTotal;
        tr.transactionDate = response.transactionDate;
        tr.transactionConcept = response.transactionConcept;
        tr.userId = response.userId;
        tr.userName = response.userName;
        tr.userEmail = response.userEmail;
      }
      this.Toast.fire({
        icon: 'success',
        title:
          'Transacción actualizada con código #' +
          this.transactionCodeCtrl.value,
      });
      this.data = undefined;
      this.closeForm.emit();
    }
  }
}
