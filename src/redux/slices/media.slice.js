import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {mediaService} from "../../services/media.service";

const initialState = {
    list: [],
    searchList: [],

    moviePopular: [],
    movieTopRated: [],
    movieUpcoming: [],
    tvPopular: [],
    tvTopRated: [],

    genres: [],
    media: {},
    videos: [],
    credits: {},
    similar: [],
    reviews: [],

    total_pages: 500,
    currentPageMedia: 1,

    loading: false,
    error: null
}

const getAllMedia = createAsyncThunk(
    'mediaSlice/getAllMedia',
    async ({mediaType, page, sort_by, year, genre, vote_average_gte, vote_average_lte}, {rejectedWithValue}) => {
        try {
            const {data} = await mediaService.list(mediaType, page, {
                sort_by,
                year,
                genre,
                vote_average_gte,
                vote_average_lte
            });
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const getOneMedia = createAsyncThunk(
    'mediaSlice/getOneMedia',
    async ({mediaType, mediaId}, {rejectedWithValue}) => {
        try {
            const {data} = await mediaService.details(mediaType, mediaId);
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const getMoviePopular = createAsyncThunk(
    'mediaSlice/getMoviePopular',
    async ({mediaType, mediaCategory}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.category(mediaType, mediaCategory);
            return data.results;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getMovieTopRated = createAsyncThunk(
    'mediaSlice/getMovieTopRated',
    async ({mediaType, mediaCategory}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.category(mediaType, mediaCategory);
            return data.results;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getMovieUpcoming = createAsyncThunk(
    'mediaSlice/getMovieUpcoming',
    async ({mediaType, mediaCategory}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.category(mediaType, mediaCategory);
            return data.results;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getTvPopular = createAsyncThunk(
    'mediaSlice/getTvPopular',
    async ({mediaType, mediaCategory}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.category(mediaType, mediaCategory);
            return data.results;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getTvTopRated = createAsyncThunk(
    'mediaSlice/getTvTopRated',
    async ({mediaType, mediaCategory}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.category(mediaType, mediaCategory);
            return data.results;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const getGenres = createAsyncThunk(
    'mediaSlice/getGenres',
    async (mediaType, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.genres(mediaType);
            return data.genres;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const getMediaVideos = createAsyncThunk(
    'mediaSlice/getMediaVideos',
    async ({mediaType, mediaId}, {rejectedWithValue}) => {
        try {
            const {data} = await mediaService.videos(mediaType, mediaId);
            return data.results;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const getMediaCredits = createAsyncThunk(
    'mediaSlice/getMediaCredits',
    async ({mediaType, mediaId}, {rejectedWithValue}) => {
        try {
            const {data} = await mediaService.credits(mediaType, mediaId);
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const getSimilarMedia = createAsyncThunk(
    'mediaSlice/getSimilarMedia',
    async ({mediaType, mediaId}, {rejectedWithValue}) => {
        try {
            const {data} = await mediaService.similar(mediaType, mediaId);
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const getMediaReviews = createAsyncThunk(
    'mediaSlice/getMediaReviews',
    async ({mediaType, mediaId}, {rejectedWithValue}) => {
        try {
            const {data} = await mediaService.reviews(mediaType, mediaId);
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const searchMedia = createAsyncThunk(
    'moviesSlice/searchMovies',
    async ({term, mediaType, page}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.search(term, mediaType, page);
            return data.results;
        } catch (e) {
            rejectWithValue(e.response.data)
        }
    }
)


const mediaSlice = createSlice({
    name: 'mediaSlice',
    initialState,
    reducers: {
        setCurrentPageMedia: (state, action) => {
            state.currentPageMedia = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAllMedia.fulfilled, (state, action) => {
                state.list = action.payload.results
                state.loading = false
                state.error = null
            })
            .addCase(getAllMedia.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllMedia.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(getOneMedia.fulfilled, (state, action) => {
                state.media = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getOneMedia.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getOneMedia.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(getMoviePopular.fulfilled, (state, action) => {
                state.moviePopular = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getMoviePopular.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMoviePopular.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(getMovieTopRated.fulfilled, (state, action) => {
                state.movieTopRated = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getMovieTopRated.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMovieTopRated.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(getMovieUpcoming.fulfilled, (state, action) => {
                state.movieUpcoming = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getMovieUpcoming.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMovieUpcoming.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(getTvPopular.fulfilled, (state, action) => {
                state.tvPopular = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getTvPopular.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTvPopular.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(getTvTopRated.fulfilled, (state, action) => {
                state.tvTopRated = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getTvTopRated.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTvTopRated.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getGenres.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(getMediaVideos.fulfilled, (state, action) => {
                state.videos = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getMediaVideos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMediaVideos.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(getMediaCredits.fulfilled, (state, action) => {
                state.credits = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getMediaCredits.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMediaCredits.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(getSimilarMedia.fulfilled, (state, action) => {
                state.similar = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getSimilarMedia.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getSimilarMedia.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(getMediaReviews.fulfilled, (state, action) => {
                state.reviews = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getMediaReviews.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMediaReviews.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(searchMedia.fulfilled, (state, action) => {
                state.searchList = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(searchMedia.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(searchMedia.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
})

const {reducer: mediaReducer, actions: {setCurrentPageMedia}} = mediaSlice;

const mediaActions = {
    getAllMedia,
    setCurrentPageMedia,
    getOneMedia,
    getMoviePopular,
    getMovieTopRated,
    getMovieUpcoming,
    getTvPopular,
    getTvTopRated,
    getGenres,
    getMediaVideos,
    getMediaCredits,
    getSimilarMedia,
    getMediaReviews,
    searchMedia
}

export {mediaReducer, mediaActions}