import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import CategoryDataService from '../../services/category.service';

const initialState = [];
const categoryUrl = URLs.categories;

//async reducers
export const createCategory = createAsyncThunk(
    `${categoryUrl}/createCategory`,
    async (data) => {
        const res = await CategoryDataService.createCategory(data);
        return res.data;
    }
);
export const updateCategory = createAsyncThunk(
    `${categoryUrl}/updateCategory/`,
    async ({ id, data }) => {
        const res = await CategoryDataService.updateCategory(id, data);
        return res.data;
    }
);
export const deleteCategory = createAsyncThunk(
    `${categoryUrl}/deleteCategory/`,
    async ({ id }) => {
        const res = await CategoryDataService.deleteCategory(id);
        return res.data;
    }
);

export const getAllCategories = createAsyncThunk(
    `${categoryUrl}/getAllCategories/`,
    async () => {
        const res = await CategoryDataService.getAllCategories();
        return res.data;
    }
);


//category Slice
const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    extraReducers: {
        [createCategory.fulfilled]: (state, action) => {
            console.log(state, action);
            return [...state, action.payload];
        },
        [updateCategory.fulfilled]: (state, action) => {
            const index = state.findIndex(category => category.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload
            };

        },
        [deleteCategory.fulfilled]: (state, action) => {
            console.log(state, action);
            return state.filter((curr) => {
                return curr.id !== action.payload;
            });
        },

        [getAllCategories.fulfilled]: (state, action) => {
            console.log(state, action);
            return [action.payload];
        },

    }

})

const { reducer } = categoriesSlice.reducer;
export default reducer;