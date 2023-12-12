// file: productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchProducts = createAsyncThunk('products/fetchProducts', async (page) => {
    try {
        const response = await fetch(`${API_GET_PATHS.lay_ds_giay_moi}?page=${page}&pageSize=4`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Fetch error: ${error.message}`);
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        page: 1,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = state.list.concat(action.payload); // Nối danh sách sản phẩm mới vào danh sách hiện tại
                state.page += 1; // Tăng trang lên cho lần tải thêm tiếp theo
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export { fetchProducts };

export default productSlice.reducer;
