import { configureStore } from '@reduxjs/toolkit'

import todosApiSlice from './features/todos/todoSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        [todosApiSlice.reducerPath]: todosApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApiSlice.middleware),
  })
}
