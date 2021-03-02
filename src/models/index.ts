export interface Identifiable {
  id: number;
}

export interface State extends Identifiable {
  name: string;
}

export interface City extends Identifiable {
  name: string;
}

export interface Address {
  name: string;
  number: string;
  complement: string;
  district: string;
  zipCode: string;
}

export interface Contact extends Identifiable {
  name: string;
  email: string;
  telephone: string;
}

export interface Person extends Identifiable {
  name: string;
  address: Address;
  active: boolean;
  contacts: Contact[];
}

export interface Category extends Identifiable {
  name: string;
}

export type EntryType = 'INCOME' | 'EXPENSE';

export interface AccountEntry extends Identifiable {
  type: EntryType;
  description: string;
  dueDate: Date;
  paymentDate: Date;
  value: number;
  observation: string;
  person: Person;
  category: Category;
  attachment: string;
  urlAttachment: string;
}
