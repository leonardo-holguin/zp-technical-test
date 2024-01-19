import { FormControl, Validators } from '@angular/forms';
import {
  PAYMENT_METHOD,
  TRANSACTION_STATUS,
} from '../../../models/transaction';

export class TrFormComponentFormCtrl {
  constructor() {
    this.transactionCodeCtrl.valueChanges.subscribe((value) => {
      if (value !== undefined) {
        const numberValue = value.replace(/\D/g, '');
        if (value !== numberValue) {
          this.transactionCodeCtrl.setValue(numberValue);
        }
      }
    });

    this.transactionTotalCtrl.valueChanges.subscribe((value) => {
      if (value !== undefined) {
        const numberValue = value.replace(/\D/g, '');
        if (value !== numberValue) {
          this.transactionTotalCtrl.setValue(numberValue);
        }
      }
    });

    this.companyCodeCtrl.valueChanges.subscribe((value) => {
      if (value !== undefined) {
        const numberValue = value.replace(/\D/g, '');
        if (value !== numberValue) {
          this.companyCodeCtrl.setValue(numberValue);
        }
      }
    });

    this.companyIdCtrl.valueChanges.subscribe((value) => {
      if (value !== undefined) {
        const numberValue = value.replace(/\D/g, '');
        if (value !== numberValue) {
          this.companyIdCtrl.setValue(numberValue);
        }
      }
    });

    this.userIdCtrl.valueChanges.subscribe((value) => {
      if (value !== undefined) {
        const numberValue = value.replace(/\D/g, '');
        if (value !== numberValue) {
          this.userIdCtrl.setValue(numberValue);
        }
      }
    });
  }

  transactionCodeCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  transactionTotalCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  transactionDateCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  transactionTimeCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  transactionPaymentMethodCtrl = new FormControl<
    PAYMENT_METHOD | string | undefined
  >(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  transactionStatusCtrl = new FormControl<
    TRANSACTION_STATUS | string | undefined
  >(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  transactionConceptCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  companyCodeCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  companyIdCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  companyNameCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  companyAddressCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  userIdCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  userNameCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  userEmailCtrl = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
    validators: [Validators.required],
  });

  formatDate(date: string | undefined | null): string | undefined {
    if (date === undefined || date === null) {
      return undefined;
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

  formatTime(time: string | undefined | null): string | undefined {
    if (time === undefined || time === null) {
      return undefined;
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
