import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import PaymentDataService from '../../services/payment.service';


const initialState = {


    isLoading: false,
    isError: false,

};
const paymentUrl = URLs.payment;


export const createPaymentLink = createAsyncThunk(
    `${paymentUrl}/createPayment`,
    async (orderId) => {
        const res = await PaymentDataService.createPaymentLink(orderId);
        console.log("response", res);
        if (res.data.payment_link_url) {
            window.location.href = res.data.payment_link_url;
        }
        return res.data;

    }
);

export const updatePayment = createAsyncThunk(
    `${paymentUrl}/updatePayment`,
    async ({ paymentId, orderId }) => {

        const res = await PaymentDataService.updatePayment(paymentId, orderId);
        console.log("inside update payment ", res);
        // alert("updated in database");
        return res.data;
    }
);


const orderSlice = createSlice({
    initialState: initialState,
    name: 'payment',
    extraReducers: (builder) => {

        //create order
        builder.addCase(createPaymentLink.pending, (state, action) => {
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(createPaymentLink.fulfilled, (state, action) => {

            console.log(action);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                paymentResult: action.payload
            }
            return newState;
        })

        builder.addCase(createPaymentLink.rejected, (state, action) => {
            console.log(action.payload)
            let newState = {
                ...state,
                isLoading: true,
                isError: true,
                error: action.payload
            }
            return newState;
        })

        //get order
        builder.addCase(updatePayment.pending, (state, action) => {
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })

        builder.addCase(updatePayment.fulfilled, (state, action) => {
            console.log(action.payload);
            let newState = {
                ...state,
                isLoading: false,
                isError: false,
                payment: action.payload
            }
            return newState;
        })

        builder.addCase(updatePayment.rejected, (state, action) => {
            console.log(action.payload);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,
                payment: {},
                error: action.payload
            }
            return newState;
        })


    }
});

export const getPaymentLoading = (state) => state.payment.isLoading;
export const getPaymentError = (state) => state.payment.isError;

export default orderSlice.reducer;;
