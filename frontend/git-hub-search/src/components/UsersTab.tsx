import React from "react";
import { UserT } from "../types/user";
import { useSearch } from "../hooks/useSearch";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const UsersTab: React.FC = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const type = useSelector((state: RootState) => state.search.type);
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearch<UserT>(query, type)

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
      {data.map((item, index) => (
        <div key={index} className="border p-4 rounded shadow bg-white">
          <div className="flex items-center gap-4">
            <img src={item.avatar_url} alt='' className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold break-words">{item.login}</p>
              <p className="text-sm text-gray-500">ID: {item.id}</p>
              <a href={item.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black no-underline text-sm transition-colors duration-200">View Profile</a>
            </div>
          </div>
        </div>
      ))}
      <div ref={observerRef} />
      {isFetchingNextPage && <p>Wait...</p>}
    </div>
  );
};

export default UsersTab;