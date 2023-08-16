import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './slices/categories';
import productReducer from './slices/products';
import userReducer from './slices/user';
import cartReducer from './slices/cart';


const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productReducer,
        user: userReducer,
        cart: cartReducer
    },
    devTools: true
});

export default store;