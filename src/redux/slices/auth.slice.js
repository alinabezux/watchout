import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../../services/auth.service";

const initialState = {
    request_token: null,
    access_data: {},
    loading: false,
    error: null,
}

const createRequestToken = createAsyncThunk(
    'authSlice/createRequestToken',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.createRequestToken();
            localStorage.setItem('request_token', data.request_token)
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const createAccessToken = createAsyncThunk(
    'authSlice/createAccessToken',
    async ({request_token}, {rejectWithValue}) => {
        try {
            const {data} = await authService.createAccessToken({request_token});
            console.log(data);
            localStorage.setItem('account_id', data.account_id)
            localStorage.setItem('access_token', data.access_token)
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const logOut = createAsyncThunk(
    'authSlice/LogOut',
    async ({access_token}, {rejectWithValue}) => {
        try {
            await authService.logOut({access_token});
            authService.deleteInfo();
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(createRequestToken.fulfilled, (state, action) => {
                state.request_token = action.payload.request_token
                state.loading = false
                state.error = null
            })
            .addCase(createRequestToken.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createRequestToken.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(createAccessToken.fulfilled, (state, action) => {
                state.access_data = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(createAccessToken.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAccessToken.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(logOut.fulfilled, (state) => {
                state.loading = false
                state.error = null;
            })

})

const {reducer: authReducer} = authSlice;

const authActions = {
    createRequestToken, createAccessToken, logOut
}
export {authReducer, authActions}