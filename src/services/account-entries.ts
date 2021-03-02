import api from './api';
import { AccountEntry } from '../models';
import moment from 'moment';

const accountEntriesUrl = '/account-entries';

export interface AccountEntriesResponse {
  entries: AccountEntry[];
  total: number;
}

export interface AccountEntryQueryParams {
  description?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  page: number;
  size: number;
}

export const searchEntries = async (params: AccountEntryQueryParams) => {
  const response = await api.get(`${accountEntriesUrl}/summary`, { params });
  const entries = response.data.content;
  return {
    entries,
    total: response.data.totalElements,
  } as AccountEntriesResponse;
};

export const deleteEntry = async (id: number) => {
  await api.delete(`${accountEntriesUrl}/${id}`);
  return null;
};

export const addEntry = async (entry: AccountEntry) => {
  const response = await api.post<AccountEntry>(accountEntriesUrl, entry);
  return response.data;
};

export const updateEntry = async (entry: AccountEntry) => {
  const response = await api.put<AccountEntry>(`${accountEntriesUrl}/${entry.id}`, entry);
  return response.data;
};

export const findEntryById = async (id: number) => {
  const response = await api.get<AccountEntry>(`${accountEntriesUrl}/${id}`);
  return response.data;
};

function convertStringToDates(entries: AccountEntry[]) {
  for (const entry of entries) {
    entry.dueDate = moment(entry.dueDate, 'YYYY-MM-DD').toDate();

    if (entry.paymentDate) {
      entry.paymentDate = moment(entry.paymentDate, 'YYYY-MM-DD').toDate();
    }
  }
}
