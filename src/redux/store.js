import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './slices/categories';
import productReducer from './slices/products';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import orderReducer from './slices/order';
import paymentReducer from './slices/payment';


const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productReducer,
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
        payment: paymentReducer

    },
    devTools: true
});

export default store;