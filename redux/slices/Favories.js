import { createSlice } from "@reduxjs/toolkit";
import uuidv4 from 'uuid/v4';

const Favories = createSlice({
    name: "history",
    initialState: [],
    reducers: {
        addFavories: (state, action) => {
            const id = action.payload.id;
            const title = action.payload.title;
            const price = action.payload.price;
            const discountPrice = action.payload.discountPrice;
            const size = action.payload.size;
            const color = action.payload.color;
            const quantity = action.payload.quantity;
            const path_img = action.payload.path_img;
            const newProductItem = {
                idv4: uuidv4(),
                id: id,
                title: title,
                price: price,
                discountPrice: discountPrice,
                size: size,
                color: color,
                quantity: quantity,
                path_img: path_img,
                isChecked: false,
            };

            state.push(newProductItem);
        },
         // xóa sản phẩm có những thuộc tính 
         removeFavories: (state, action) => {
            const idv4 = action.payload
            return state.filter((item) => item.id !== idv4);
        },
    },
});

export const { addFavories ,removeFavories} =
    Favories.actions;
export default Favories.reducer;
