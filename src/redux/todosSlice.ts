import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockApi } from '../utils';

type MockDataType = {
    delay: number
    message: string
}

type TodosStateType = {
    mockData: MockDataType | null
    mockDataLoading: boolean
    mockDataErrorMsg: string

    todoCount: number
}

const initialState: TodosStateType = {
    mockData: null,
    mockDataLoading: false,
    mockDataErrorMsg: "",

    todoCount: 0
}

export const mockAsync = createAsyncThunk<MockDataType, string, { state: { todos: TodosStateType } }>(
    'todos/mockAsync',
    async (message, thunkApi) => {
        return mockApi<string>(2000, message);
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodoCount: (state, action: PayloadAction<number>) => {
            state.todoCount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(mockAsync.fulfilled, (state, action: PayloadAction<MockDataType>) => {
            state.mockData = action.payload;
            state.mockDataLoading = false;
            state.mockDataErrorMsg = "";
        }).addCase(mockAsync.pending, (state, action) => {
            state.mockDataLoading = true;
            state.mockDataErrorMsg = "";
        }).addCase(mockAsync.rejected, (state, action) => {
            state.mockDataLoading = false;
            state.mockDataErrorMsg = action.error.message || "API Error";
        });
      }
});
export const { setTodoCount } = todosSlice.actions;
export default todosSlice.reducer;