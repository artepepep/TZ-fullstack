import React from 'react';
import './App.css';
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import SearchType from './components/SearchType';
import { setQuery } from './store/searchSlice';
import { EntityType } from './types/common';
import UsersTab from './components/UsersTab';
import RepositoriesTab from './components/RepositoriesTab';

function App() {
  const dispatch = useDispatch()
  const query = useSelector((state: RootState) => state.search.query)
  const type = useSelector((state: RootState) => state.search.type)

  const TabsMap = {
    [EntityType.USERS]: UsersTab,
    [EntityType.REPOSITORIES]: RepositoriesTab,
  };

  const ActiveTabComponent = TabsMap[type];

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 gap-6 p-4 bg-gray-100">
      <Header/>
      <div className='flex gap-3'>
      <SearchInput
      query={query}
      onQueryChange={(value) => dispatch(setQuery(value))}
      />
      <SearchType/>
      </div>
      {query.length < 3 ? (
        <p className="text-gray-500 text-center">
          Type at least 3 letters to begin browsing GitHub search.
        </p>
      ) : (
        ActiveTabComponent && <ActiveTabComponent />
      )}
    </div>
  );
}

export default App;
