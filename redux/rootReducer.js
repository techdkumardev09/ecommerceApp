import cartReducer from './CartSlice';
import addressReducer from './AddressSlice';
import {combineReducers} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({cart: cartReducer,address:addressReducer});
