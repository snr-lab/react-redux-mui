import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'

import todosSlice from './todosSlice';

const rootReducer = combineReducers({
    Todos: todosSlice
});

export const store = configureStore({
    reducer: rootReducer
});