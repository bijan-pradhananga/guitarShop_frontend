// userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "@/config/config";

// Define initial state
const initialState = {
    data: null,
    token: null,
    isLoading: false,
    error: null,
};

// Async thunk for register
export const fetchSingleAdminData = createAsyncThunk('admin/:id', async (id, { rejectWithValue }) => {
    try {
        const response = await API.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue(error.message);
    }
});


// Async thunk for login
export const loginAdmin = createAsyncThunk('/adminlogin', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await API.post('/auth/adminLogin', { email, password });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Async thunk for logout
export const logoutAdmin = createAsyncThunk('admin/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await API.post('/auth/adminLogout');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for auth
export const checkAdminAuth = createAsyncThunk('admin/checkAdminAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await API.get('/auth/admin');
        return response.data;
        
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return rejectWithValue('unauthorized');
        }
        return rejectWithValue('An error occurred');
    }
});



// Create the admin slice
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.data = action.payload.admin;
            state.token = action.payload.token;
        },
        clearAdmin: (state) => {
            state.data = null;
            state.token = null;
        },
        updateData: (state,action)=>{
            state.data = {...state.data,...action.payload};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleAdminData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSingleAdminData.fulfilled, (state,action) => {
                state.isLoading = false;
                state.data = action.payload.admin;
            })
            .addCase(fetchSingleAdminData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            })
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.data = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                // console.log('pend');
            })
            .addCase(logoutAdmin.fulfilled, (state,action) => {
                state.isLoading = false;
                state.data = null;
                state.token = null;
                // console.log('done');
               
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                // console.log('no');
            })
            .addCase(checkAdminAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAdminAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.admin;
            })
            .addCase(checkAdminAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
                state.data = null; // Clear the user data on unauthorized
            });
    },
});

// Export actions and reducer
export const { setAdmin, clearAdmin,updateData } = adminSlice.actions;
export default adminSlice.reducer;
