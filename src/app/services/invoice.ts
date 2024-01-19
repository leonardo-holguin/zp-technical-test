import { IInvoiceServerDTO } from '../models/dto/invoice.server.dto';
import { IInvoice } from '../models/invoice';
import {
  ITransaction,
  PAYMENT_METHOD,
  TRANSACTION_STATUS,
} from '../models/transaction';

export class InvoiceService {
  static async _getData(): Promise<IInvoice[]> {
    let resetedData: IInvoice[] = [];

    const localData = localStorage.getItem('data');
    if (localData !== null) {
      resetedData = await this.resetData(JSON.parse(localData));
    } else {
      const serverData = await this.getServerData();
      resetedData = await this.resetData(serverData);
      localStorage.setItem('data', JSON.stringify(serverData));
    }

    return resetedData;
  }

  static async _addTransaction(
    transaction: IInvoiceServerDTO
  ): Promise<IInvoice> {
    const localData = localStorage.getItem('data');
    if (localData === null) {
      throw 'No local data';
    }
    const resetedDataJSON: IInvoiceServerDTO[] = JSON.parse(localData);
    resetedDataJSON.unshift(transaction);
    localStorage.setItem('data', JSON.stringify(resetedDataJSON));

    const resetedData = await this.resetData([transaction]);
    return resetedData[0];
  }

  static async _updateTransaction(
    transactionCode: ITransaction['code'],
    transaction: IInvoiceServerDTO
  ): Promise<IInvoice> {
    const localData = localStorage.getItem('data');
    if (localData === null) {
      throw 'No local data';
    }
    const resetedDataJSON: IInvoiceServerDTO[] = JSON.parse(localData);
    const tr = resetedDataJSON.find(
      (item) => item.Trans_codigo === transactionCode
    );
    if (tr) {
      tr.comercio_codigo = transaction.comercio_codigo;
      tr.comercio_nombre = transaction.comercio_nombre;
      tr.comercio_nit = transaction.comercio_nit;
      tr.comercio_direccion = transaction.comercio_direccion;
      tr.Trans_codigo = transaction.Trans_codigo;
      tr.Trans_medio_pago = transaction.Trans_medio_pago;
      tr.Trans_estado = transaction.Trans_estado;
      tr.Trans_total = transaction.Trans_total;
      tr.Trans_fecha = transaction.Trans_fecha;
      tr.Trans_concepto = transaction.Trans_concepto;
      tr.usuario_identificacion = transaction.usuario_identificacion;
      tr.usuario_nombre = transaction.usuario_nombre;
      tr.usuario_email = transaction.usuario_email;
    }
    localStorage.setItem('data', JSON.stringify(resetedDataJSON));

    const resetedData = await this.resetData([transaction]);
    return resetedData[0];
  }

  static async getServerData(): Promise<IInvoiceServerDTO[]> {
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

  static async resetData(data: IInvoiceServerDTO[]): Promise<IInvoice[]> {
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

  static getTransactionPaymentMethod(
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

  static getTransactionStatus(
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

  static _PaymentMethodConvertion(
    method: number | string | PAYMENT_METHOD
  ): number {
    if (method == 0 || method == '0' || method == PAYMENT_METHOD.CREDIT_CARD) {
      return 32;
    } else if (method == 1 || method == '1' || method == PAYMENT_METHOD.PSE) {
      return 29;
    } else if (method == 2 || method == '2' || method == PAYMENT_METHOD.GANA) {
      return 41;
    } else if (
      method == 3 ||
      method == '3' ||
      method == PAYMENT_METHOD.CASH_REGISTER
    ) {
      return 42;
    }
    return 0;
  }

  static _TransactionStatusConvertion(
    status: number | string | TRANSACTION_STATUS
  ): number {
    if (status == 0 || status == '0' || status == TRANSACTION_STATUS.APPROVED) {
      return 1;
    } else if (
      status == 1 ||
      status == '1' ||
      status == TRANSACTION_STATUS.REJECTED
    ) {
      return 1000;
    } else if (
      status == 2 ||
      status == '2' ||
      status == TRANSACTION_STATUS.PENDING
    ) {
      return 999;
    }
    return 0;
  }
}
