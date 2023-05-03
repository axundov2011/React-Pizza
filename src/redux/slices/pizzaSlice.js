import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get(
      `https://63c6a465d307b769673d8f2a.mockapi.io/favorites?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      //Eger bu sirada menum categoryam 0 dan coxdursa elave et sirama "category=${categoryId}"
    );
    return data;
  }
);
const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      console.log(fetchPizzas.pending.toString());
      state.status = "Loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log(fetchPizzas.fulfilled.toString());
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log(fetchPizzas.rejected.toString());
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
