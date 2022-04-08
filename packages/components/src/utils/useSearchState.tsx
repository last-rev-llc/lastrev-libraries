import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DEBOUNCE_TIME = 700;

let params: { [key: string]: string };

interface SearchState {
  query: string;
  page: number;
}

interface UseSearchState {
  searchState: SearchState;
  handleSearchStateChange: (updatedSearchState: SearchState) => void;
}

export function useSearchState(): UseSearchState {
  const [searchState, setSearchState] = useState<SearchState>({ query: '', page: 1 });
  const setStateId = useRef<any>();
  const router = useRouter();
  const { query } = router;

  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
  }

  const handleSearchStateChange = (updatedSearchState: SearchState) => {
    clearTimeout(setStateId.current);

    setStateId.current = setTimeout(() => {
      router.query.query = updatedSearchState.query;
      router.query.page = String(updatedSearchState.page);
      router.push(router, undefined, { shallow: true });
    }, DEBOUNCE_TIME);

    setSearchState(updatedSearchState);
  };

  useEffect(() => {
    if ((query.query && query.query !== searchState.query) || (query.page && Number(query.page) !== searchState.page)) {
      setSearchState((prev) => ({ ...prev, query: String(query.query ?? ''), page: Number(query.page ?? 1) }));
    }
  }, [query]);

  useEffect(() => {
    setSearchState((prev) => ({ ...prev, query: String(params.query ?? ''), page: Number(params.page ?? 1) }));
  }, []);

  return { searchState, handleSearchStateChange };
}

export default useSearchState;
