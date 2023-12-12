// CategorySlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: ["Giày Jordan Nam", "Giày Jordan Nữ", "Giày Adidas Nam", "Giày Adidas Nữ", "Giày Nike Nam","Giày Nike Nữ"],
  selectedCategory: "Giày Jordan Nam",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategory } = categorySlice.actions;
export const categorySelector = (state) => state.category;
export default categorySlice.reducer;
