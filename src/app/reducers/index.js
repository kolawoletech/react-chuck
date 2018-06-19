import { combineReducers } from "redux";

import getCategories from "./getCategories";
import getCategoryJokes from "./getCategoryJokes";

const rootReducer = combineReducers({
  getCategories,
  getCategoryJokes
});

export default rootReducer;
