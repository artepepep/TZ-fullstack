import React from "react";
import { RepositoryT } from "../types/repository";
import { FaStar } from 'react-icons/fa';
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useSearch } from "../hooks/useSearch";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const RepositoriesTab: React.FC = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const type = useSelector((state: RootState) => state.search.type);
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearch<RepositoryT>(query, type)

  const { observerRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No results to show</p>;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {data.map((item, idx) => (
        <div key={idx} className="border p-4 rounded shadow bg-white">
          <p className="font-semibold text-lg">{item.full_name}</p>
          <p className="text-gray-600">Owner: {item.owner.login}</p>
          <a
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on GitHub
          </a>
          <p className="flex items-center gap-1 mt-2">
            <FaStar className="text-yellow-500" size={14} />
            {item.stargazers_count}
          </p>
        </div>
      ))}
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && <p>Wait...</p>}
    </div>
  );
};

export default RepositoriesTab;