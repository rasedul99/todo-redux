import { BASE_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch(`${BASE_URL}/todos`);
  const data = await res.json();
  return data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const toggleComplete = createAsyncThunk(
  "todos/toggleComplete",
  async (todo) => {
    const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PATCH",
      body: JSON.stringify(todo),
    });
    const data = response.json()
    return data
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    isLoading: false,
    todos: [],
    error: null,
  },
  extraReducers: (builder) => {
    // fetchTodos pending, fulfilled, rejected
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.todos = [];
      state.error = action.error.message;
    });

    // deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.error = null;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // toggleComplete
    // builder.addCase(toggleComplete.pending, (state)=> {
    //   state.isLoading = true
    // }),
    builder.addCase(toggleComplete.fulfilled, (state, action)=>{
      state.isLoading = false
      state.todos = state.todos.map(todo => todo.id !== action.payload.id ? todo : {...action.payload, completed:!action.payload.completed})
    })
    builder.addCase(toggleComplete.rejected, (state,payload)=> {
    state.error = payload.error.message
    })
  },
});

// export const {deleteTodo, toggleComplete} = todosSlice.actions
export default todosSlice.reducer;
