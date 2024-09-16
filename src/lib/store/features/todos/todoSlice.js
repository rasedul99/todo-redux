import { initialTodos } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: "todos",
    initialState:initialTodos,
    reducers:{
        deleteTodo: (state, action) => {
           return state.filter((todo) => todo.id !== action.payload)
        },
        toggleComplete: (state, action) => {
          return state.map((todo)=> todo.id !== action.payload.id ? todo : {...todo,completed:!todo.completed})
        }
    }
})

export const {deleteTodo, toggleComplete} = todosSlice.actions
export default todosSlice.reducer