import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskStatusEnum } from '../../enums/task.enum';

export type TaskState = {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: TaskStatusEnum;
};

const loadState = (): TaskState[] => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return [];
  }
};

const saveState = (state: TaskState[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const initialState: TaskState[] = loadState();

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskState>) => {
      state.push(action.payload);
      saveState(state);
    },
    updateTask: (state, action: PayloadAction<Omit<TaskState, 'status'>>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        saveState(state);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state[index].status = TaskStatusEnum.REMOVED;
        saveState(state);
      }
    },
    markTaskAsCompleted: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const existingTask = state.find((task) => task.id === taskId);
      if (existingTask && existingTask.status !== TaskStatusEnum.OVERDUE) {
        existingTask.status = TaskStatusEnum.COMPLETED;
        saveState(state);
      }
    },
    checkOverdueTasks: (state) => {
      const now = new Date();
      state.forEach((task) => {
        if (
          task.deadline &&
          new Date(task.deadline) < now &&
          task.status === TaskStatusEnum.PENDING
        ) {
          task.status = TaskStatusEnum.OVERDUE;
        }
        saveState(state);
      });
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
  checkOverdueTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
