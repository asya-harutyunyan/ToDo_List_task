import { Middleware } from "@reduxjs/toolkit";
import { checkOverdueTasks } from "../slices/task.slice";

const overdueCheckMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    next(action);
    if (
      ["tasks/addTask", "tasks/editTask", "tasks.removeTask"].includes(
        action.type
      )
    ) {
      store.dispatch(checkOverdueTasks());
    }
  };

export default overdueCheckMiddleware;
