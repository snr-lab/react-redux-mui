import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import todosSlice from './todosSlice';

const rootReducer = combineReducers({
    todos: todosSlice
});

export const store = configureStore({
    reducer: rootReducer
});

//Creating typed dispatch and selector
type RootStateType = ReturnType<typeof store.getState>
type AppDispatchType = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatchType>()
