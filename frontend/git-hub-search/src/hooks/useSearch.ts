import { useDebounce } from './useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/query';
import searchService from '../services/SearchService';
import { EntityType } from '../types/common';

export const useSearch = <T>(value='', type=EntityType.REPOSITORIES) => {
  const debounceValue = useDebounce(value, 500);

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCH, debounceValue, type],
    queryFn: ({ pageParam = '1' }: { pageParam: string | null }) => {
      return searchService.search<T>({ page: pageParam, value: debounceValue, type });
    },
    getNextPageParam: lastPage => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return null;
    },
    initialPageParam: null,
  });

  return {
    isLoading,
    data: data?.pages.flatMap(page => page.data),
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
}