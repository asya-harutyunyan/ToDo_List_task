import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { TaskState } from '../../../redux/slices/task.slice';
import { TaskStatusEnum } from '../../../enums/task.enum';
import { formatToEnGB } from '../../../utils/dateUtils';

const RemovedTasks: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const removedTasks = tasks.filter(
    (task: TaskState) => task.status === TaskStatusEnum.REMOVED
  );

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
          </TableRow>
        </TableHead>
        <TableBody>
          {removedTasks.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{ textAlign: 'center', border: 'none', fontSize: '24px' }}
              >
                No removed tasks yet
              </TableCell>
            </TableRow>
          )}
          {removedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{formatToEnGB(task.deadline)}</TableCell>
              <TableCell>{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RemovedTasks;
