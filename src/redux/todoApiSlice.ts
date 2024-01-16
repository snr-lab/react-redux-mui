import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoProp } from "../pages/Todo";

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query<TodoProp[], void>({
            query: () => "todos",
            providesTags: ["Todos"]
        }),
        addTodo: builder.mutation<void, TodoProp>({
            query: (todo) => ({
                url: "/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),
        deleteTodo: builder.mutation<void, number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Todos"]
        }),
        updateTodo: builder.mutation<void, TodoProp>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            }),
            invalidatesTags: ["Todos"]
        })
    })
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = todoApi;