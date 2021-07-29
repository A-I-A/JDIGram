import {applyMiddleware} from "redux";

const { createStore } = require("redux");
import ReduxThunk from 'redux-thunk';
import { avatarReducer } from "./avatarReducer.js";

const store = createStore(avatarReducer, applyMiddleware(ReduxThunk));

export default store;
