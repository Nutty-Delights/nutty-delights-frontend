import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './slices/categories';
import productReducer from './slices/products';


const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productReducer
    },
    devTools: true
});

export default store;