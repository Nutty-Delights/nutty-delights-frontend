import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import UserService from '../../services/user.service';
import { toast } from "react-toastify";



const initialState = {
    token: {},
    isLoading: false,
    isError: false
};
const userUrl = URLs.users;

//async reducers
export const registerUser = createAsyncThunk(
    `/${userUrl}/register`,
    async (data) => {
        const res = await UserService.userRegisteration(data);
        const user = res.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }

        return res.data;
    }
);
export const loginUser = createAsyncThunk(
    `/${userUrl}/login`,
    async (data) => {
        const res = await UserService.userLogin(data);
        const user = res.data;
        console.log("loging in", user)
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }

        return res.data;
    }
);



//User Slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        //Login User
        builder.addCase(loginUser.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            // toast.promise("Processing..")
            return newState;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(state, action);
            const token = action.payload;
            console.log("payload", token);
            let newState = {
                isLoading: false,
                isError: false,
                token: token


            }
            token.jwt !== "" ? toast.success("Login Successfully") : toast.error(token.message)
            return newState;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,
            }
            toast.error("Account Not Exist or Invalid Password !")
            return newState;
        })

        //register user
        builder.addCase(registerUser.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            // toast.promise("Processing..")
            return newState;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log(state, action);
            const token = action.payload;
            console.log("payload", token);
            let newState = {
                isLoading: false,
                isError: false,
                token: token


            }
            toast.success("User Registered Sucessfully")
            return newState;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,
            }
            toast.error("Account Already Exist !")
            return newState;
        })

    }

})


export const getUser = (state) => state.user.user;
export const getUserLoading = (state) => state.user.isLoading;
export const getUserError = (state) => state.user.isError;


export default userSlice.reducer;;