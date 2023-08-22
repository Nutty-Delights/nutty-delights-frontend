import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import CartDataService from '../../services/cart.service';
import { toast } from "react-toastify";
import { act } from "react-dom/test-utils";
import { Difference } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const initialState = {
    // cartItems: null,
    cart: null,
    isLoading: false,
    isError: false,
    isLoadingRemoveItem: false,
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
export const updateCartItem = createAsyncThunk(
    `${cartUrl}/update`,
    async ({ token, data }) => {

        const res = await CartDataService.updateCartItem(token, data);
        console.log("update cart item", res);
        // alert("updated in database");
        return res.data;
    }
);

export const removeItemFromCart = createAsyncThunk(
    `${cartUrl}/delete`,
    async ({ token, data }) => {

        const res = await CartDataService.removeItem(token, data?.cartItemId);
        console.log("inside delete cart", res);
        // alert("updated in database");
        return res.data;
    }
);

//Cart Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        clearCart(state, action) {
            const initialState = {
                // cartItems: null,
                cart: null,
                isLoading: false,
                isError: false,
                isLoadingRemoveItem: false,
            };

            return initialState;
        }
    },
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


        builder.addCase(removeItemFromCart.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoadingRemoveItem: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            console.log(state, action);
            const Cart = action.payload;
            console.log("Cart", Cart)

            console.log("payload", Cart);
            let newState = {
                ...state,
                isLoadingRemoveItem: false,
                isError: false,
                cart: Cart?.cart


            }
            return newState;
        })
        builder.addCase(removeItemFromCart.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoadingRemoveItem: false,
                isError: true,


            }
            return newState;
        })

        //get all categories
        builder.addCase(updateCartItem.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoadingUpdateItem: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(updateCartItem.fulfilled, (state, action) => {
            console.log("add item", state, action);
            const { cartItem, status, message } = action.payload
            var updatedCartItems = [...state.cart.cartItems];
            var index = updatedCartItems.findIndex((item) => item.cartItemId === cartItem?.cartItemId);


            if (index !== -1) {

                var price = state.cart.cartItems[index].cartItemPrice;
                var updatedPrice = cartItem.cartItemPrice;
                var diff = updatedPrice - price;
                updatedCartItems[index] = {
                    ...updatedCartItems[index],
                    ...cartItem
                }



                var newCart = {
                    ...state.cart,
                    cartItems: updatedCartItems,
                    cartTotalPrice: state.cart.cartTotalPrice + diff
                }

                let newState = {
                    ...state,
                    isLoadingUpdateItem: false,
                    isError: false,
                    cart: newCart
                    // cartItems: [...state.cartItems, cartItem],

                }

                if (status) {
                    // toast.success("Item Added to cart");
                }
                else {
                    toast.error("Something went wrong ! try again")
                }


                return newState;
            }

            else {
                let newState = {
                    ...state,
                    isLoadingUpdateItem: false,
                    isError: false,
                    cart: {
                        ...state.cart,
                        cartItems: [...state.cart.cartItems, cartItem],
                        cartTotalItems: state.cart.cartItems.length + 1,
                        // cartTotalPrice: state.cart.cartTotalPrice + cartItem.cartItemPrice
                    }
                }

                if (status) {
                    toast.success("Item Added to cart");
                }
                else {
                    toast.error("Something went wrong ! try again")
                }

                // console.log("newState after adding item", newState);
                return newState;

            }
        })
        builder.addCase(updateCartItem.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                // categories: [...state.categories],
                isLoading: false,
                isError: action,
            }


            return newState;
        })


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
            var updatedCartItems = [...state.cart.cartItems];
            var index = updatedCartItems.findIndex((item) => item.cartItemId === cartItem?.cartItemId);


            if (index !== -1) {
                updatedCartItems[index] = {
                    ...updatedCartItems[index],
                    ...cartItem
                }

                let newState = {
                    ...state,
                    isLoading: false,
                    isError: false,
                    cart: {
                        ...state.cart,
                        cartItems: updatedCartItems,
                        cartTotalItems: updatedCartItems?.length,
                        // cartTotalPrice: state.cart.cartTotalPrice + cartItem.cartItemPrice

                    }
                    // cartItems: [...state.cartItems, cartItem],

                }

                if (status) {
                    toast.success("Item Added to cart", {
                        action: <button onClick={() => { useNavigate("/cart") }}>dismiss</button>,

                    });
                }
                else {
                    toast.error("Something went wrong ! try again")
                }


                return newState;
            }

            else {
                let newState = {
                    ...state,
                    isLoading: false,
                    isError: false,
                    cart: {
                        ...state.cart,
                        cartItems: [...state.cart.cartItems, cartItem],
                        cartTotalItems: state.cart.cartItems.length + 1,
                        // cartTotalPrice: state.cart.cartTotalPrice + cartItem.cartItemPrice
                    }
                }

                if (status) {
                    toast.success("Item Added to cart");
                }
                else {
                    toast.error("Something went wrong ! try again")
                }

                // console.log("newState after adding item", newState);
                return newState;

            }
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


export const { clearCart } = cartSlice.actions;

export const getUserCart = (state) => state.cart.cart;
export const getRemoveLoading = (state) => state.cart.isLoadingRemoveItem;
// export const getUserCartItems = (state) => state.cart.cartItems;
export const getCartLoading = (state) => state.cart.isLoading;
export const getCartError = (state) => state.cart.isError;
export const getUpdateItemLoading = (state) => state.cart.isLoadingUpdateItem;

export default cartSlice.reducer;;