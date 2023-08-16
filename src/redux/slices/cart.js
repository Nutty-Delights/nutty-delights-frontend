import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import CartDataService from '../../services/cart.service';
import { toast } from "react-toastify";
import { act } from "react-dom/test-utils";


const initialState = {
    // cartItems: null,
    cart: null,
    isLoading: false,
    isError: false
};
const cartUrl = URLs.cart;

//async reducers

// export const updateCart = createAsyncThunk(
//     `${CartUrl}/updateCart`,
//     async ({ id, data }) => {

//         const res = await CartDataService.updateCart(id, data);
//         console.log("inside update Cart", res);
//         // alert("updated in database");
//         return res.data;
//     }
// );
// export const deleteCart = createAsyncThunk(
//     `${CartUrl}/deleteCart/:id`,
//     async (id) => {
//         const res = await CartDataService.deleteCart(id);
//         console.log(res);
//         return res.data;
//     }
// );

export const getCart = createAsyncThunk(
    `${cartUrl}/getCart`,
    async (token) => {
        const res = await CartDataService.getUserCart(token);
        console.log("response", res);
        return res.data;
    }
);

export const addItemToCart = createAsyncThunk(
    `${cartUrl}/add`,
    async ({ token, data }) => {

        const res = await CartDataService.addToCart(token, data);
        console.log("inside update Cart", res);
        // alert("updated in database");
        return res.data;
    }
);

//Cart Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        //create Cart extra reducers
        builder.addCase(getCart.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            console.log(state, action);
            const Cart = action.payload;

            console.log("payload", Cart);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                cart: Cart


            }
            return newState;
        })
        builder.addCase(getCart.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,


            }
            return newState;
        })

        //get all categories
        builder.addCase(addItemToCart.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            console.log("add item", state, action);
            const { cartItem, status, message } = action.payload

            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                // cartItems: [...state.cartItems, cartItem],

            }

            // if (status) {
            toast.success("Item Added to cart");
            // }
            // else {
            // toast.error("Something went wrong ! try again")
            // }

            // console.log("newState after adding item", newState);
            return newState;
        })
        builder.addCase(addItemToCart.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                // categories: [...state.categories],
                isLoading: false,
                isError: action,
            }


            return newState;
        })


    }

})


export const getUserCart = (state) => state.cart.cart;
// export const getUserCartItems = (state) => state.cart.cartItems;
export const getCartLoading = (state) => state.cart.isLoading;
export const getCartError = (state) => state.cart.isError;


export default cartSlice.reducer;;