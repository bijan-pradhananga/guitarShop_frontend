import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk('fetchOrders',async (page)=>{
    try {
        let currPage = page ? page : 1
        const response = await API.get(`order?page=${currPage}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const buyNow = createAsyncThunk('buyNow', async (order)=>{
    try {
        const response = await API.post(`order`,order)
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const checkOut = createAsyncThunk('checkout', async (id)=>{
    try {
        const response = await API.post(`order/checkout`,id)
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const fetchUserOrders = createAsyncThunk('fetchUserOrders', async (id)=>{
    try {
        const response = await API.delete(`order/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const updateCategory = createAsyncThunk(
    'updateCategory',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/category/${id}`, formData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // If the error has a response with data, return it as rejectWithValue
                return rejectWithValue(error.response.data);
            } else {
                // Otherwise, return a general error message
                return rejectWithValue({ message: 'An error occurred while updating the product' });
            }
        }
    }
);


export const fetchSingleCategory = createAsyncThunk('fetchSingleCategory',async (id)=>{
    try {
        const response = await API.get(`category/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const initialState={
    data: [],
    singleOrderData:{},
    isLoading:true,
    error: null,
    totalPages: 1,
    totalOrders: 0
}

const categorySlice = createSlice({
    name:'category',
    initialState: initialState,
    extraReducers: (builder)=>{
        builder.addCase(buyNow.pending,(state,action)=>{
            state.isLoading= true
        });
        builder.addCase(buyNow.fulfilled,(state,action)=>{
            state.isLoading= false
        });
        builder.addCase(buyNow.rejected,(state,action)=>{
            state.isLoading= false,
            state.error= true
        });
        builder.addCase(updateCategory.pending,(state,action)=>{
            state.isLoading= true
        });
        builder.addCase(updateCategory.fulfilled,(state,action)=>{
            state.isLoading= false
        });
        builder.addCase(updateCategory.rejected,(state,action)=>{
            state.isLoading= false,
            state.error= action.payload.message
        });
        builder.addCase(fetchUserOrders.pending,(state,action)=>{
            state.isLoading= true
        });
        builder.addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.isLoading= false,
            state.data = action.payload.orders
        });
        builder.addCase(fetchUserOrders.rejected,(state,action)=>{
            state.isLoading= false,
            state.error= true
        });
        builder.addCase(fetchOrders.pending,(state,action)=>{
            state.isLoading= true
        });
        builder.addCase(fetchOrders.fulfilled,(state,action)=>{
            state.isLoading= false,
            state.data = action.payload.orders,
            state.totalOrders = action.payload.total,
            state.totalPages = action.payload.totalPages
        });
        builder.addCase(fetchOrders.rejected,(state,action)=>{
            state.isLoading= false,
            state.error= true
        });
    }
})

export default categorySlice.reducer