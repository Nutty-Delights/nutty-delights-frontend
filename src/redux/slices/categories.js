import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URLs } from "../../services/base_urls/constant";
import CategoryDataService from '../../services/category.service';


const initialState = {
    categories: [],
    isLoading: false,
    isError: false
};
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
    `${categoryUrl}/updateCategory`,
    async ({ id, data }) => {

        const res = await CategoryDataService.updateCategory(id, data);
        console.log("inside update category", res);
        // alert("updated in database");
        return res.data;
    }
);
export const deleteCategory = createAsyncThunk(
    `${categoryUrl}/deleteCategory/:id`,
    async (id) => {
        const res = await CategoryDataService.deleteCategory(id);
        console.log(res);
        return res.data;
    }
);

export const getAllCategories = createAsyncThunk(
    `${categoryUrl}/getAllCategories/`,
    async () => {
        const res = await CategoryDataService.getAllCategories();
        console.log("response", res);
        return res.data;
    }
);


//category Slice
const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        //create category extra reducers
        builder.addCase(createCategory.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            console.log(state, action);
            const category = action.payload;
            console.log("payload", category);
            let newState = {
                isLoading: false,
                isError: false,
                categories: [
                    ...state.categories,
                    category,
                ]

            }
            return newState;
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                isLoading: false,
                isError: true,


            }
            return newState;
        })

        //get all categories
        builder.addCase(getAllCategories.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            console.log("inside get all", state, action);
            let newState = {
                isLoading: false,
                isError: false,
                categories: [
                    ...action.payload
                ]

            }

            console.log("newState after fetching categories", newState);
            return newState;
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                categories: [...state.categories],
                isLoading: false,
                isError: action,
            }


            return newState;
        })

        //update category
        builder.addCase(updateCategory.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            const index = state.categories.findIndex(category => category.categoryId === action.payload.categoryId);
            var updatedArray = [...state.categories];
            updatedArray[index] = {
                ...updatedArray[index],
                ...action.payload
            }

            const newState = {
                ...state,
                isLoading: false,
                isError: false,
                categories: updatedArray
            }
            console.log("index", index)

            return newState;
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,


            }
            return newState;
        })
        //delete category
        builder.addCase(deleteCategory.pending, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: true,
                isError: false
            }
            return newState;
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            console.log(state, action);
            var filterCategories = state.categories.filter((cat) => cat.categoryId !== action.payload)
            var newState = {
                ...state,
                isLoading: false,
                isError: false,
                categories: filterCategories

            }

            console.log("New State after deleting", newState);

            return newState;
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            console.log(state, action);
            let newState = {
                ...state,
                isLoading: false,
                isError: true,


            }
            return newState;
        })
    }

})


export const getCategories = (state) => state.categories.categories;
export const getCategoriesLoading = (state) => state.categories.isLoading;
export const getCategoriesError = (state) => state.categories.isError;


export default categoriesSlice.reducer;;