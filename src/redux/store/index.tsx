import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../slices/task.slice";
import overdueCheckMiddleware from "../middleware/overdue";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(overdueCheckMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
