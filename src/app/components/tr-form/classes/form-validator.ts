import { FormControl } from '@angular/forms';

export enum VALIDATION_ERROR {
  TRANSACTION_CODE,
  TRANSACTION_TOTAL,
  TRANSACTION_DATE,
  TRANSACTION_TIME,
  TRANSACTION_PAYMENT_METHOD,
  TRANSACTION_STATUS,
  TRANSACTION_CONCEPT,
  COMPANY_CODE,
  COMPANY_ID,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  USER_ID,
  USER_NAME,
  USER_EMAIL,
}

export class TrFormComponentFormValidator {
  static validateFormData(data: {
    transactionCodeCtrl: FormControl;
    transactionTotalCtrl: FormControl;
    transactionDateCtrl: FormControl;
    transactionTimeCtrl: FormControl;
    transactionPaymentMethodCtrl: FormControl;
    transactionStatusCtrl: FormControl;
    transactionConceptCtrl: FormControl;
    companyCodeCtrl: FormControl;
    companyIdCtrl: FormControl;
    companyNameCtrl: FormControl;
    companyAddressCtrl: FormControl;
    userIdCtrl: FormControl;
    userNameCtrl: FormControl;
    userEmailCtrl: FormControl;
  }): undefined | VALIDATION_ERROR {
    if (!this._validateNullable(data.transactionCodeCtrl)) {
      return VALIDATION_ERROR.TRANSACTION_CODE;
    } else if (!this._validateNullable(data.transactionTotalCtrl)) {
      return VALIDATION_ERROR.TRANSACTION_TOTAL;
    } else if (!this._validateNullable(data.transactionDateCtrl)) {
      return VALIDATION_ERROR.TRANSACTION_DATE;
    } else if (!this._validateNullable(data.transactionTimeCtrl)) {
      return VALIDATION_ERROR.TRANSACTION_TIME;
    } else if (
      !this._validateNullable(data.transactionPaymentMethodCtrl) ||
      data.transactionPaymentMethodCtrl.value === 4
    ) {
      return VALIDATION_ERROR.TRANSACTION_PAYMENT_METHOD;
    } else if (
      !this._validateNullable(data.transactionStatusCtrl) ||
      data.transactionStatusCtrl.value === 3
    ) {
      return VALIDATION_ERROR.TRANSACTION_STATUS;
    } else if (!this._validateNullable(data.transactionConceptCtrl)) {
      return VALIDATION_ERROR.TRANSACTION_CONCEPT;
    } else if (!this._validateNullable(data.companyCodeCtrl)) {
      return VALIDATION_ERROR.COMPANY_CODE;
    } else if (!this._validateNullable(data.companyIdCtrl)) {
      return VALIDATION_ERROR.COMPANY_ID;
    } else if (!this._validateNullable(data.companyNameCtrl)) {
      return VALIDATION_ERROR.COMPANY_NAME;
    } else if (!this._validateNullable(data.companyAddressCtrl)) {
      return VALIDATION_ERROR.COMPANY_ADDRESS;
    } else if (!this._validateNullable(data.userIdCtrl)) {
      return VALIDATION_ERROR.USER_ID;
    } else if (!this._validateNullable(data.userNameCtrl)) {
      return VALIDATION_ERROR.USER_NAME;
    } else if (
      !this._validateNullable(data.userEmailCtrl) ||
      !this._validateEmail(data.userEmailCtrl.value)
    ) {
      return VALIDATION_ERROR.USER_EMAIL;
    }

    return undefined;
  }

  static _validateNullable(ctrl: FormControl): boolean {
    if (!ctrl || !ctrl.valid) {
      return false;
    }
    return true;
  }

  static _validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
