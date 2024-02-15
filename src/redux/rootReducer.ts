import { combineReducers } from "redux";
import { authUserReducer } from "./authUserReducer";
import { commentsReducer } from "./commentsReducer";

export const rootReducer = combineReducers({
   authUserStore: authUserReducer,
   commentsStore: commentsReducer
})