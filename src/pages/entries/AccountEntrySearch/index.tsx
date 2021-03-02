import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import moment from 'moment';
import './styles.css';
import { AccountEntryQueryParams } from '../../../services/account-entries';
import { AccountEntry } from '../../../models';
import useFetchEntries from '../../../hooks/useFetchEntries';

const initialQueryParams: AccountEntryQueryParams = {
  page: 0,
  size: 5,
  description: '',
};

const AccountEntrySearch = () => {
  const { fetchEntries, entries, entriesError, entriesLoading, totalEntries } = useFetchEntries();
  const [queryParams, setQueryParams] = useState<AccountEntryQueryParams>(initialQueryParams);
  const [first, setFirst] = useState(0);

  const dataTable = useRef(null);

  useEffect(() => {
    fetchEntries(queryParams);
  }, [queryParams.page]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchEntries(queryParams);
  };

  const onPageChange = (e: { first: number; rows: number }) => {
    setQueryParams({ ...queryParams, page: e.first / e.rows });
    setFirst(e.first);
  };

  const valueTemplate = (rowData: AccountEntry) => {
    const value = rowData.value ? rowData.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
    return <span>{value}</span>;
  };

  const dateTemplate = (date: Date) => {
    const value = date ? moment(date).format('DD/MM/YYYY') : '';
    return <span>{value}</span>;
  };

  return (
    <div className="container">
      {entriesError && entriesError.message && <Message severity="error" text={entriesError.message} />}

      <div className="p-fluid">
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className="p-field p-grid">
            <h1>Lançamentos</h1>
          </div>

          <div className="p-field p-grid">
            <div className="p-col-12 p-md-10">
              <label>Descrição</label>
              <InputText
                type="text"
                name="description"
                value={queryParams.description}
                onChange={(e) => setQueryParams({ ...queryParams, description: e.currentTarget.value })}
              />
            </div>
          </div>

          <div className="p-col-12 p-md-10">
            <Button type="submit" label="Pesquisar" />
          </div>
        </form>
      </div>

      <div className="p-fluid">
        <div className="p-col-12">
          <DataTable
            ref={dataTable}
            value={entries}
            lazy
            paginator
            first={first}
            loading={entriesLoading}
            rows={queryParams.size}
            totalRecords={totalEntries}
            onPage={onPageChange}
          >
            <Column field="description" header="Descrição" />
            <Column
              headerClassName="col-date-header"
              bodyClassName="col-date"
              field="dueDate"
              header="Vencimento"
              body={(e: AccountEntry) => dateTemplate(e.dueDate)}
            />
            <Column
              headerClassName="col-date-header"
              bodyClassName="col-date"
              field="paymentDate"
              header="Pagamento"
              body={(e: AccountEntry) => dateTemplate(e.paymentDate)}
            />
            <Column
              headerClassName="col-value-header"
              bodyClassName="col-value"
              field="value"
              header="Valor"
              body={valueTemplate}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default AccountEntrySearch;
