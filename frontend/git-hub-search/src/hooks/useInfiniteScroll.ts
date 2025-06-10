import { useEffect, useRef } from 'react';

type Props = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const useInfiniteScroll = ({ fetchNextPage, hasNextPage, isFetchingNextPage }: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return { observerRef };
};