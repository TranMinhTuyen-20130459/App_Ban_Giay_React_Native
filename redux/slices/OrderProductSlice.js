import {createSlice} from "@reduxjs/toolkit";

const orderProductSlice = createSlice({
    name: "orderProducts",
    initialState: [],
    reducers: {
        addOrderProduct: (state, action) => {

            const idv4 = action.payload.idv4;
            const id = action.payload.id;
            const title = action.payload.title;
            const price = action.payload.price;
            const discountPrice = action.payload.discountPrice;
            const size = action.payload.size;
            const color = action.payload.color;
            const quantity = action.payload.quantity;
            const path_img = action.payload.path_img;

            const newCartItem = {
                idv4: idv4,
                id: id,
                title: title,
                price: price,
                discountPrice: discountPrice,
                size: size,
                color: color,
                quantity: quantity,
                path_img: path_img
            };

             state.push(newCartItem)
        },

        removeOrderProduct: (state, action) => {
            const idv4 = action.payload
            return state.filter((item) => item.idv4 !== idv4);
        },
        removeAllOrderProduct: () => {
            return [];
        },
    },
});

export const {addOrderProduct, removeOrderProduct, removeAllOrderProduct} = orderProductSlice.actions;
export default orderProductSlice.reducer;