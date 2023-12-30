// CategorySlice.js

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categories: [
        {name: "Giày Jordan Nam", image: require("../../assets/Category/jordan_nam.jpeg")},
        {name: "Giày Jordan Nữ", image: require("../../assets/Category/jodan_nu.jpeg")},
        {name: "Giày Adidas Nam", image: require("../../assets/Category/adidas_nam.jpg")},
        {name: "Giày Adidas Nữ", image: require("../../assets/Category/adidas_nu.jpg")},
        {name: "Giày Nike Nam", image: require("../../assets/Category/nike_nam.jpeg")},
        {name: "Giày Nike Nữ", image: require("../../assets/Category/nike_nu.jpeg")},
    ],
    selectedCategory: "Giày Jordan Nam",
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        selectCategory: (state, action) => {
            const selectedCategoryName = action.payload;
            state.selectedCategory = selectedCategoryName;
        },
    },
});


export const {selectCategory} = categorySlice.actions;
export const categorySelector = (state) => state.category;
export default categorySlice.reducer;
