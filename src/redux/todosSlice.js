import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { getTodos as getTodosApi } from './../lib/api-calls';
import { addTodo as addTodoApi } from './../lib/api-calls';
import { deleteTodo as deleteTodoApi } from './../lib/api-calls';
import { updateTodo as updateTodoApi } from './../lib/api-calls';

export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async () => {
        const response = await getTodosApi();
        return response;
    }
);
export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (todoTask, thunkApi) => {
        const todoList = thunkApi.getState().Todos.todoList;
        let newId = 0;
        if(todoList.length > 0){
            const latestItem = todoList.reduce((latestItem, currentItem) => {
                if(latestItem.id > currentItem.id){
                    return latestItem;
                }
                return currentItem;
            });
            newId = latestItem.id + 1;
        }
        const response = await addTodoApi({id: newId, task: todoTask, done: false});
        return response;
    }
);
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (todoId) => {
        const response = await deleteTodoApi(todoId);
        return response;
    }
);
export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (todo) => {
        const response = await updateTodoApi(todo);
        return response;
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todoList: [],
        loading: false,
        errorMsg: ""
    },
    reducers: {
        testAction: {
            reducer(state, action){

            },
            prepare(payload){
                return {payload}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.todoList = action.payload;
        }).addCase(addTodo.fulfilled, (state, action) => {
            state.todoList.push(action.payload);
        }).addCase(deleteTodo.fulfilled, (state, action) => {
            state.todoList = state.todoList.filter((todo)=>{
                if(todo.id === action.payload){
                    return false;
                }
                return true;
            });
        }).addCase(updateTodo.fulfilled, (state, action) => {
            state.todoList = state.todoList.map((todo)=>{
                if(todo.id === action.payload.id){
                    return action.payload;
                }
                return todo;
            });
        }).addMatcher(isAnyOf(getTodos.pending, addTodo.pending, deleteTodo.pending, updateTodo.pending), (state, action) => {
            state.loading = true;
            state.errorMsg = "";
        }).addMatcher(isAnyOf(getTodos.fulfilled, addTodo.fulfilled, deleteTodo.fulfilled, updateTodo.fulfilled), (state, action) => {
            state.loading = false;
            state.errorMsg = "";
        }).addMatcher(isAnyOf(getTodos.rejected, addTodo.rejected, deleteTodo.rejected, updateTodo.rejected), (state, action) => {
            state.loading = false;
            state.errorMsg = action.error.message || "API Error";
        });
      }
});
export const { testAction } = todosSlice.actions;
export default todosSlice.reducer;