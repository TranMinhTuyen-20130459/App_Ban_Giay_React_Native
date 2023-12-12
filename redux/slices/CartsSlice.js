import { createSlice } from "@reduxjs/toolkit";
import uuidv4 from 'uuid/v4';

const cartSlice = createSlice({
    name: "carts",
    initialState: [],
    reducers: {
        addCart: (state, action) => {
            const id = action.payload.id;
            const title = action.payload.title;
            const price = action.payload.price;
            const discountPrice = action.payload.discountPrice;
            const size = action.payload.size;
            const color = action.payload.color;
            const quantity = action.payload.quantity;
            const path_img = action.payload.path_img;
            const newCartItem = {
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

            state.push(newCartItem);
        },
        // xóa sản phẩm có những thuộc tính id, size, color
        removeCart: (state, action) => {
            const idv4 = action.payload
            return state.filter((item) => item.idv4 !== idv4);
        },
        updateCart: (state, action) => {
            const { idv4, quantity } = action.payload;
            const updatedState = state.map((item) => {
                if (item.idv4 === idv4) {
                    return { ...item, quantity: quantity };
                }
                return item;
            });
            return updatedState;
        },
        removeAllCart: () => {
            return [];
        },
    },
});

export const { addCart, addAll, removeCart, updateCart, removeAllCart } =
    cartSlice.actions;
export default cartSlice.reducer;
