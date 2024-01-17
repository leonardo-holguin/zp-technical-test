export enum PAYMENT_METHOD {
  CREDIT_CARD,
  PSE,
  GANA,
  CASH_REGISTER,
}

export enum TRANSACTION_STATUS {
  APPROVED,
  REJECTED,
  PENDING,
}

export interface ITransaction {
  code: string;
  paymentMethod: PAYMENT_METHOD;
  status: TRANSACTION_STATUS;
  total: number;
  date: string;
  concept: string;
}
