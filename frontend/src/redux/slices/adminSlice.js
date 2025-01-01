import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchUsersData = createAsyncThunk(
    'admin/fetchUsersData',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/admin/data');
            return response.data.data
        } catch (error) {
            console.log("Error while fetching data in slice:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState =  {
    users: [],
    loading: false,
    error: null,
    searchTerm: '',
    filteredUsers:[]
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;

            if(action.payload) {
                state.filteredUsers = state.users.filter(user => {
                    return user.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                    user.email.toLowerCase().includes(action.payload.toLowerCase())
                })
            } else {
                state.filteredUsers = state.users;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersData.pending,  (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsersData.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.filteredUsers = state.searchTerm ? 
            state.users.filter(user => 
                user.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(state.searchTerm.toLowerCase())
            ) : 
            action.payload;
        })
        .addCase(fetchUsersData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {setSearchTerm} = adminSlice.actions;


export default adminSlice.reducer;