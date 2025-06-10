import React from "react";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ query, onQueryChange }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search GitHub..."
            className="px-4 py-2 h-10 rounded border border-gray-300 focus:outline-none focus:ring"
          />
        </div>
      );
}

export default SearchInput