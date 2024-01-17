import { ICompany } from './company';
import { ITransaction } from './transaction';
import { IUser } from './user';

export interface IInvoice {
  // Invoice properties
  id: string;
  // Company properties
  companyCode: ICompany['code'];
  companyName: ICompany['name'];
  companyId: ICompany['id'];
  companyAddress: ICompany['address'];
  // Transaction properties
  transactionCode: ITransaction['code'];
  transactionPaymentMethod: ITransaction['paymentMethod'];
  transactionStatus: ITransaction['status'];
  transactionTotal: ITransaction['total'];
  transactionDate: ITransaction['date'];
  transactionConcept: ITransaction['concept'];
  // User properties
  userId: IUser['id'];
  userName: IUser['name'];
  userEmail: IUser['email'];
}
