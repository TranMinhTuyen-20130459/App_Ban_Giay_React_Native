import { createSelector } from "@reduxjs/toolkit";

//export những giá trị trong redux mà chúng ta muốn lấy ra, khi muốn lấy ra chúng ta gọi đến lớp này

// gọi tới CartsSlice để lấy ra carts
export const cartsSelector = (state) => state.carts
