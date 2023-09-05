import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import PaymentDataService from '../../services/payment.service';
import { toast } from "react-toastify";


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
    async ({ payId, orderId }) => {

        const res = await PaymentDataService.updatePayment(payId, orderId);
        console.log("inside update payment ", res);
        // alert("updated in database");
        return res.data;
    }
);
export const PayOnDeliveryPayment = createAsyncThunk(
    `${paymentUrl}/PayOnDeliveryPayment`,
    async (orderId) => {

        const res = await PaymentDataService.PayOnDeliveryPayment(orderId);
        console.log("inside PayOnDeliveryPayment payment ", res);
        // alert("updated in database");
        return res.data;
    }
);


const paymentSlice = createSlice({
    initialState: initialState,
    name: 'payment',
    reducers: {
        changePaymentStatus(state, action) {
            const { status } = action.payload;
            let newState = {
                isLoading: false,
                isError: false,
            }
            console.log("state", newState);
            return newState;
        }
    },
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
                payment: action.payload?.status
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


        builder.addCase(PayOnDeliveryPayment.pending, (state, action) => {
            let newState = {
                ...state,
                isPodLoading: true,
                isPodError: false
            }
            return newState;
        })

        builder.addCase(PayOnDeliveryPayment.fulfilled, (state, action) => {
            console.log(action.payload);
            let newState = {
                ...state,
                isPodLoading: false,
                isPodError: false,
                podPayment: !action.payload?.error,
                placedOrder: action.payload?.order

            }

            toast.success("Order Placed Succesfully")
            return newState;
        })

        builder.addCase(PayOnDeliveryPayment.rejected, (state, action) => {
            console.log(action.payload);
            let newState = {
                ...state,
                isPodLoading: false,
                isPodError: true,
                payment: {},
                error: action.payload?.error,
                message: action.payload?.messgae
            }
            toast.error("Could not process your order");

            return newState;
        })


    }
});

export const getPaymentLoading = (state) => state.payment.isLoading;
export const getPaymentError = (state) => state.payment.isError;
export const getPodLoading = (state) => state.payment.isPodLoading;
export const getPodError = (state) => state.payment.isPodError;
export const getPaymentStatus = (state) => state.payment.podPayment;
export const getPaymentPlacedOrder = (state) => state.payment.placedOrder;

export const { changePaymentStatus } = paymentSlice.actions;

export default paymentSlice.reducer;;
