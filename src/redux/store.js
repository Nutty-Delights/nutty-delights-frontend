import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './slices/categories';

const reducer = {
    categories: categoriesReducer
}

const store = configureStore({
    reducer: {
        categories: categoriesReducer
    },
    devTools: true
});

export default store;