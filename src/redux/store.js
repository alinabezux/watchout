import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {mediaReducer} from "./slices/media.slice";
import {personReducer} from "./slices/person.slice";
import {authReducer} from "./slices/auth.slice";
import {userReducer} from "./slices/user.slice";


const rootReducer = combineReducers({mediaReducer, personReducer, authReducer, userReducer});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {setupStore};