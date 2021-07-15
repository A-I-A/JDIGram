const { createStore } = require("redux");
import ReduxThunk from 'redux-thunk';
import { avatarReducer } from "./avatarReducer.js";

const store = createStore(avatarReducer);

export default store;
