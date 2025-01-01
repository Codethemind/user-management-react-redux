import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../api/axiosInstance';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    token: sessionStorage.getItem('token') || null,
    loading: false,
    error: null,
    inputValue:''
};

const asynEditUserName = createAsyncThunk(
    'user/asynEditUserName',
    async ({ email, name }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/admin/editAnName/${email}`, { name });
            if(response.ok) {

            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            sessionStorage.setItem('user', JSON.stringify(action.payload.user));
            sessionStorage.setItem('token', action.payload.token);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        },
        updateName: (state, action) => {
            if (state.user) {
                state.user.name = action.payload.name;
                sessionStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        handleInputValue : (state, action) => {
            state.inputValue + action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asynEditUserName.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(asynEditUserName.fulfilled, (state, action) => {
                state.loading = false;
                if (state.user) {
                    state.user.name = action.payload.data.name;
                    sessionStorage.setItem('user', JSON.stringify(state.user));
                }
            })
            .addCase(asynEditUserName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, updateName, handleInputValue } = userSlice.actions;
export { asynEditUserName };
export default userSlice.reducer;
