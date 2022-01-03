import { combineReducers } from "redux";
import carsReducer from "./carReducers";
import alertsReducer from './alertsReducer'
import authReducer from './authReducer'
import bookingReducer from "./bookingReducer";

export const rootReducers = combineReducers({carsReducer,alertsReducer,authReducer,bookingReducer})