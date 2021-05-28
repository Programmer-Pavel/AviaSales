import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {aviaSalesReducer} from "./aviaSalesReducer";


const rootReducer = combineReducers({
    avia: aviaSalesReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))