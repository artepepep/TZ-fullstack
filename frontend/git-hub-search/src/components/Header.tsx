import React from "react";
import { FaGithub } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <FaGithub size={32}/>
      <div>
        <h1 className="text-xl font-bold">GitHub Searcher</h1>
        <p className="text-gray-500 text-sm">Search users or repositories below</p>
      </div>
    </div>
  );
};

export default Header