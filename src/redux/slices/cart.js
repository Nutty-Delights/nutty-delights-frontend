import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import CartDataService from '../../services/cart.service';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const initialState = {
    // cartItems: null,

    cart: null,
    isLoading: false,
    isError: false,
    isLoadingRemoveItem: false,
};
const cartUrl = URLs.cart;


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

        // if (!token) {
        //     if (localStorage.getItem('cart')) {
        //         localStorage.setItem('items', JSON.stringify(data));
        //         return JSON.parse(localStorage.getItem('cart'));
        //     }
        //     else {
        //         localStorage.setItem('cart', JSON.stringify({
        //             cartId: '',
        //             cartUserId: "",
        //             cartItems: [],
        //             cartTotalItems: 1,
        //             cartTotalPrice: 5
        //         }))
        //     }

        //     return JSON.parse(localStorage.getItem('cart'));
        // }
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


        createCart(state, action) {

            console.log("In the create Cart");
            const cart = {
                cartId: '',
                cartUserId: '',
                cartItems: [],
                cartTotalItems: 0,
                cartTotalPrice: 0.0
            };
            let newState = {
                ...state,
                cart: cart
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            return newState;
        },
        setCart(state, action) {

            console.log("In the set Cart");
            if (localStorage.getItem('cart')) {

                let newState = {
                    ...state,
                    cart: JSON.parse(localStorage.getItem('cart'))
                }

                return newState;
            }

            else {
                console.log("In the create Cart");
                const cart = {
                    cartId: '',
                    cartUserId: '',
                    cartItems: [],
                    cartTotalItems: 0,
                    cartTotalPrice: 0.0
                };
                let newState = {
                    ...state,
                    cart: cart
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                return newState;
            }




        },
        addItems(state, action) {
            const { data } = action.payload;
            if (!localStorage.getItem('cart')) {
                const cart = {
                    cartId: '',
                    cartUserId: '',
                    cartItems: [data],
                    cartTotalItems: 1,
                    cartTotalPrice: data.quantity * data.variant.sellingPrice
                };
                let newState = {
                    ...state,
                    cart: cart
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                toast.success("Item added to cart")
                return newState;
            }

            else {
                const index = state.cart.cartItems?.findIndex(item => item.variant.id === data.variant.id);
                // console.log("state products", state.productsByCategory.length)

                if (index !== -1) {
                    var cartItemsLocal = [...state.cart.cartItems];

                    console.log(index)
                    // var updatedArray = [...state.productsByCategory];
                    cartItemsLocal[index] = {
                        ...cartItemsLocal[index],
                        quantity: cartItemsLocal[index]?.quantity + data?.quantity
                    }


                    let newCart = {
                        ...state.cart,
                        cartItems: cartItemsLocal,
                        cartTotalItems: cartItemsLocal.length,
                        cartTotalPrice: state.cart.cartTotalPrice
                    }
                    let newState = {
                        ...state,
                        cart: newCart

                    }
                    toast.success("Item added to cart")
                    localStorage.setItem('cart', JSON.stringify(newCart));

                    console.log("new Cart", newCart)
                    return newState;


                }



                else {
                    let newCart = {
                        ...state.cart,
                        cartItems: [...state.cart.cartItems, data],
                        cartTotalItems: state.cart.cartTotalItems + 1,
                        cartTotalPrice: state.cart.cartTotalPrice
                    }
                    console.log("data n add Items", data);
                    let newState = {
                        ...state,
                        cart: newCart

                    }
                    toast.success("Item added to cart")
                    localStorage.setItem('cart', JSON.stringify(newCart));
                    return newState;
                }
            }



        },
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
            if (localStorage.getItem('cart')) {
                const localStorageCart = JSON.parse(localStorage.getItem('cart'));
                var updatedCart = {
                    ...Cart,
                    cartItems: [...Cart.cartItems, ...localStorageCart.cartItems],
                    cartTotalItems: localStorageCart.cartTotalItems + Cart.cartTotalItems,

                }
                console.log("payload", Cart);
                let newState = {
                    ...state,
                    isLoading: false,
                    isError: false,
                    cart: {
                        ...state.cart,
                        ...updatedCart
                    }


                }

                // localStorage.setItem('cart', JSON.stringify(updatedCart));

                return newState;


            }

            else {
                let newState = {
                    ...state,
                    isLoading: false,
                    isError: false,
                    cart: {
                        ...state.cart,
                        ...Cart
                    }


                }

                // localStorage.setItem('cart', JSON.stringify(updatedCart));

                return newState;
            }


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
            console.log("state", { ...state });
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


export const { clearCart, addItems, createCart, setCart } = cartSlice.actions;

export const getUserCart = (state) => state.cart.cart;
export const getRemoveLoading = (state) => state.cart.isLoadingRemoveItem;
// export const getUserCartItems = (state) => state.cart.cartItems;
export const getCartLoading = (state) => state.cart.isLoading;
export const getCartError = (state) => state.cart.isError;
export const getUpdateItemLoading = (state) => state.cart.isLoadingUpdateItem;

export default cartSlice.reducer;;