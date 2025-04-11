import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "../Authentication/reducer";
import { projectReducer } from "../Project/reducer";
import issueReducer from "../Issue/reducer";
import chatReducer from "../Chat/reducer";
import commentReducer from "../Comment/reducer";
import { subscriptionReducer } from "../Subscription/reducer";

const rootReducer = combineReducers({
       auth :authReducer,
       project:projectReducer,
       chat : chatReducer,
       comment:commentReducer,
       issue :issueReducer ,
       subscription:subscriptionReducer
});


export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));