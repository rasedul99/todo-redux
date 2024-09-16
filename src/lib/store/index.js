import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './features/todos/todoSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        todos: todosReducer
    }
  })
}