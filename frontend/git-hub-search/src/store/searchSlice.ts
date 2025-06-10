import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntityType } from "../types/common";

interface SearchState {
  type: EntityType;
  query: string;
}

const initialState: SearchState = {
  type: EntityType.REPOSITORIES,
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<EntityType>) {
      state.type = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setType, setQuery } = searchSlice.actions;
export default searchSlice.reducer;