import React from "react";
import { RepositoryT } from "../types/repository";
import { UserT } from "../types/user";
import { EntityType } from "../types/common";

interface Props {
  items: UserT[] | RepositoryT[] | undefined;
  type: EntityType;
}

const ResultsGrid = ({ items = [], type = EntityType.REPOSITORIES }: Props) => {
  if (items.length === 0) {
    return <p className="text-center text-gray-500">No results to show</p>;
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          {/* Примерно отрисовка, в зависимости от типа */}
          {type === EntityType.USERS && 'login' in item && (
            <p>User: {(item as any).login}</p>
          )}
          {type === EntityType.REPOSITORIES && 'fullName' in item && (
            <p>Repo: {(item as any).fullName}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultsGrid;