import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {personService} from "../../services/person.service";

const initialState = {
    personSearch: [],
    person: {},
    loading: false,
    error: null
}

const getPerson = createAsyncThunk(
    'personSlice/getPerson',
    async (personId, {rejectedWithValue}) => {
        try {
            const {data} = await personService.person(personId);
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const getPersonMedias = createAsyncThunk(
    'personSlice/getPersonMedia',
    async (personName, {rejectedWithValue}) => {
        try {
            const {data} = await personService.personMedias(personName);
            console.log(data.results);
            return data.results;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);


const personSlice = createSlice({
    name: 'personSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getPerson.fulfilled, (state, action) => {
                state.person = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getPerson.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPerson.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(getPersonMedias.fulfilled, (state, action) => {
                state.personSearch = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getPersonMedias.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPersonMedias.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
})

const {reducer: personReducer} = personSlice;

const personActions = {
    getPerson, getPersonMedias
}

export {personReducer, personActions}