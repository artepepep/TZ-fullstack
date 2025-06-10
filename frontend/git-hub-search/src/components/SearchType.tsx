import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setType } from "../store/searchSlice";
import { EntityType } from "../types/common";

const SearchType: React.FC = () => {
  const type = useSelector((state: RootState) => state.search.type);
  const dispatch = useDispatch();

  return (
    <select
      value={type}
      onChange={(e) => dispatch(setType(e.target.value as EntityType))}
      className="px-4 py-2 h-10 rounded border border-gray-300 focus:outline-none focus:ring"
    >
      <option value="users">Users</option>
      <option value="repositories">Repositories</option>
    </select>
  );
};

export default SearchType;