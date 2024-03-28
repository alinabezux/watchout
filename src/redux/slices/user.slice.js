import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services/user.service";


const initialState = {
    username: '',
    favorites: {},
    watchlist: {},
    rated: {},
    loading: false,
    error: null
}

const getAccount = createAsyncThunk(
    'userSlice/getAccount',
    async ({account_id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.account(account_id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getUserFavorites = createAsyncThunk(
    'userSlice/getUserFavorites',
    async ({account_object_id, mediaType, nameOfList}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserList(account_object_id, mediaType, 'favorites');
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getUserWatchlist = createAsyncThunk(
    'userSlice/getUserWatchlist',
    async ({account_object_id, mediaType, nameOfList}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserList(account_object_id, mediaType, 'watchlist');
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getRated = createAsyncThunk(
    'userSlice/getRated',
    async ({account_object_id, mediaType, nameOfList}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserList(account_object_id, mediaType, 'rated');
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const addToFavorite = createAsyncThunk(
    'userSlice/addToFavorite',
    async ({account_id, mediaType, media_id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.addToFavorite(account_id, mediaType, media_id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addToWatchlist = createAsyncThunk(
    'userSlice/addToWatchlist',
    async ({account_id, mediaType, media_id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.addToWatchlist(account_id, mediaType, media_id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addRating = createAsyncThunk(
    'userSlice/addRating',
    async ({mediaType, mediaId, value}, {rejectWithValue}) => {
        try {
            const {data} = await userService.addRating(mediaType, mediaId, value);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAccount.fulfilled, (state, action) => {
                state.username = action.payload.username
                state.loading = false
                state.error = null
            })
            .addCase(getAccount.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAccount.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(getUserFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getUserFavorites.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserFavorites.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(getUserWatchlist.fulfilled, (state, action) => {
                state.watchlist = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getUserWatchlist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserWatchlist.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(getRated.fulfilled, (state, action) => {
                state.rated = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getRated.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getRated.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(addToFavorite.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(addToFavorite.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addToFavorite.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(addToWatchlist.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(addToWatchlist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addToWatchlist.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(addRating.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(addRating.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addRating.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


});

const {reducer: userReducer} = userSlice;
const userActions = {
    getAccount, getUserFavorites, getUserWatchlist, getRated, addToFavorite, addToWatchlist, addRating
}

export {userReducer, userActions}
