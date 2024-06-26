import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { TaskStatusEnum } from '../../../enums/task.enum';
import {
  TaskState,
  deleteTask,
  markTaskAsCompleted,
} from '../../../redux/slices/task.slice';
import { formatToEnGB } from '../../../utils/dateUtils';

type TaskListType = {
  selectTaskHandler: (id: string) => void;
  tasks: TaskState[];
};

const TasksList: FC<TaskListType> = ({ selectTaskHandler, tasks }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleMarkTaskAsCompleted = (taskId: string) => {
    dispatch(markTaskAsCompleted(taskId));
  };

  return (
    <TableContainer sx={{ mt: '25px' }}>
      <Table
        sx={{
          minWidth: 900,
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Complete task</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{ textAlign: 'center', border: 'none', fontSize: '24px' }}
              >
                No tasks yet
              </TableCell>
            </TableRow>
          )}
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{formatToEnGB(task.deadline)}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleMarkTaskAsCompleted(task.id)}
                  disabled={
                    task.status === TaskStatusEnum.COMPLETED ||
                    task.status === TaskStatusEnum.OVERDUE
                  }
                >
                  Mark as Complete
                </Button>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit task"
                  onClick={selectTaskHandler.bind(null, task.id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete task"
                  onClick={handleDeleteTask.bind(null, task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksList;
