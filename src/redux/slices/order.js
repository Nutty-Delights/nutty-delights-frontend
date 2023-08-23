import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import OrderDataService from '../../services/order.service';



const initialState = {

    orders: [],
    order: null,
    isLoading: false,
    isError: false,

};
const orderUrl = URLs.order;


export const createOrder = createAsyncThunk(
    `${orderUrl}/createOrder`,
    async (address) => {
        const res = await OrderDataService.createOrder(address);
        console.log("response", res);
        return res.data;
    }
);

export const getOrder = createAsyncThunk(
    `${orderUrl}/getOrder`,
    async ({ orderId }) => {

        const res = await OrderDataService.getOrder(orderId);
        console.log("inside get Order", res);
        // alert("updated in database");
        return res.data;
    }
);
export const getUserOrders = createAsyncThunk(
    `${orderUrl}/getUserOrders`,
    async () => {

        const res = await OrderDataService.getUserOrders();
        console.log("user orders", res);
        // alert("updated in database");
        return res.data;
    }
);

const orderSlice = createSlice({
    initialState: initialState,
    name: 'order',
    extraReducers: (builder) => {

        //create order
        builder.addCase(createOrder.pending, (state, action) => {

            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(createOrder.fulfilled, (state, action) => {
            console.log(action);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                order: action.payload
            }
            return newState;
        })

        builder.addCase(createOrder.rejected, (state, action) => {
            let newState = {
                ...state,
                isLoading: false,
                isError: true
            }
            return newState;
        })

        //get order
        builder.addCase(getOrder.pending, (state, action) => {
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(getOrder.fulfilled, (state, action) => {
            let newState = {
                ...state,
                isLoading: false,
                isError: false
            }
            return newState;
        })

        builder.addCase(getOrder.rejected, (state, action) => {
            console.log(action);

            let newState = {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload
            }
            return newState;
        })

        //get user orders
        builder.addCase(getUserOrders.pending, (state, action) => {
            let newState = {
                ...state,
                orders: [],
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(getUserOrders.fulfilled, (state, action) => {
            console.log(action);
            let newState = {
                ...state,
                orders: action.payload,
                isLoading: false,
                isError: false
            }
            return newState;
        })

        builder.addCase(getUserOrders.rejected, (state, action) => {
            console.log(action);
            let newState = {
                ...state,
                orders: [],
                isLoading: false,
                isError: true,
                error: action.payload
            }
            return newState;
        })
    }
});

export default orderSlice.reducer;;
