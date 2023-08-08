import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './slices/categories';
import productReducer from './slices/products';
import userReducer from './slices/user';


const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productReducer,
        user: userReducer
    },
    devTools: true
});

export default store;