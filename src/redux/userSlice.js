import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const login = createAsyncThunk("get/signIn", async (email) => {
    let res = await axios.get(`https://localhost:7193/api/Users/${email}`);
    console.log(res.status);
    if(res.status==200)
        return res.data;
    else
        return undefined;
})

const initialState = {
    currentUser: null,
    counter: 0
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        incrementByAmount(state, action) {
            state.counter += action.payload
        },
    },
    extraReducers: (builder) => 
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        }).addCase(login.rejected, (state, action) => {
            console.log(action.payload);
        })
    
})

export default userSlice.reducer