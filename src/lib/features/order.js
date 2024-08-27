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

export const checkOut = createAsyncThunk('checkout', async (user_id)=>{
    try {
        const response = await API.post(`order/checkout`,{user_id})
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const fetchUserOrders = createAsyncThunk('fetchUserOrders', async (id, { rejectWithValue })=>{
    try {
        const response = await API.get(`order/${id}`)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const updateOrder = createAsyncThunk(
    'updateOrder',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/order/${id}`, formData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // If the error has a response with data, return it as rejectWithValue
                return rejectWithValue(error.response.data);
            } else {
                // Otherwise, return a general error message
                return rejectWithValue({ message: 'An error occurred while updating the order' });
            }
        }
    }
);

export const cancelOrder = createAsyncThunk('cancelOrder',async (id)=>{
    try {
        const response = await API.put(`order/${id}/cancel`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
})


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
    items:[],
    singleOrderData:{},
    isLoading:true,
    error: null,
    totalPages: 1,
    totalOrders: 0
}

const orderSlice = createSlice({
    name:'order',
    initialState: initialState,
    reducers: {
        setItems: (state,action) => {
            state.items = action.payload;  
        },
    },
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
        builder.addCase(checkOut.pending,(state,action)=>{
            state.isLoading= true
        });
        builder.addCase(checkOut.fulfilled,(state,action)=>{
            state.isLoading= false
        });
        builder.addCase(checkOut.rejected,(state,action)=>{
            state.isLoading= false,
            state.error= true
        });
        builder.addCase(updateOrder.pending,(state,action)=>{
            state.isLoading= true
        });
        builder.addCase(updateOrder.fulfilled,(state,action)=>{
            state.isLoading= false
        });
        builder.addCase(updateOrder.rejected,(state,action)=>{
            state.isLoading= false,
            state.error= action.payload.message
        });
        builder.addCase(cancelOrder.pending,(state,action)=>{
            state.isLoading= true
        });
        builder.addCase(cancelOrder.fulfilled,(state,action)=>{
            state.isLoading= false
        });
        builder.addCase(cancelOrder.rejected,(state,action)=>{
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

// Export actions and reducer
export const { setItems } = orderSlice.actions;
export default orderSlice.reducer