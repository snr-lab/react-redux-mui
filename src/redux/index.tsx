import { ReactNode } from "react";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import todosSlice from './todosSlice';
import { todoApi } from "./todoApiSlice";

const rootReducer = combineReducers({
    [ todoApi.reducerPath ]: todoApi.reducer,
    todos: todosSlice
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(todoApi.middleware)
    },
});

//Creating typed dispatch and selector
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

//Wrapper for redux
interface ChildProps {
  children?: ReactNode;
}

const ReduxWrapper: React.FC<ChildProps> = (props) => {
  const { children } = props;
  return (
    <Provider store={ store }>    
      { children }
    </Provider>
  );
};
  
export default ReduxWrapper;
