import { BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todoApiSlice = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: ["todos"],
    }),
    createTodo: builder.mutation({
      query: (data) => ({ method: "POST", url: "/todos", body: data }),
      invalidatesTags: ["todos"],
    }),
    toggleTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        method: "PATCH",
        url: `/todos/${id}`,
        body: {
          id,
          ...rest,
        },
      }),
      invalidatesTags: ["todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({ method: "DELETE", url: `/todos/${id}` }),
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
} = todoApiSlice;
export default todoApiSlice;
