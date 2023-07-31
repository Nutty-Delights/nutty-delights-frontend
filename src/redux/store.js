import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './slices/categories';

const reducer = {
    categories: categoriesReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;