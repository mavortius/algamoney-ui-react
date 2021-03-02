import { useState } from 'react';
import { AccountEntryQueryParams, searchEntries } from '../services/account-entries';
import { AccountEntry } from '../models';

const useFetchEntries = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AccountEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const fetchEntries = (params: AccountEntryQueryParams) => {
    setLoading(true);
    searchEntries(params)
      .then((response) => {
        setData(response.entries);
        setTotal(response.total);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return {
    entriesLoading: loading,
    entries: data,
    totalEntries: total,
    entriesError: error,
    fetchEntries,
  };
};
export default useFetchEntries;
