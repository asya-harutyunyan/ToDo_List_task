import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  TaskState,
  updateTask,
} from '../../../redux/slices/task.slice';
import { TaskStatusEnum } from '../../../enums/task.enum';
import { v4 as uuidv4 } from 'uuid';
import TasksList from '../TaskList';
import { RootState } from '../../../redux/store';

type CreateTaskProps = {
  tasks?: [];
};

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().optional(),
  deadline: yup.string().optional().typeError('Invalid date'),
});

const CreateTask: FC<CreateTaskProps> = () => {
  const tasks = useSelector((state: RootState) => state.tasks).filter(
    (task: TaskState) => task.status !== TaskStatusEnum.REMOVED
  );

  const [selectedTask, setSelectedTask] = useState<null | string>(null);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      deadline: '',
    },
  });

  const selectTaskHandler = useCallback(
    (id: string) => {
      const editableTask = tasks.find((task: TaskState) => task.id === id);

      if (editableTask) {
        reset({
          title: editableTask.title,
          description: editableTask.description,
          deadline: editableTask.deadline,
        });
        setSelectedTask(editableTask?.id);
      }
    },
    [tasks]
  );

  const onSubmit = (data: Omit<TaskState, 'id' | 'status'>) => {
    if (selectedTask) {
      dispatch(updateTask({ ...data, id: selectedTask }));
    } else {
      const newTask = {
        ...data,
        id: uuidv4(),
        status: TaskStatusEnum.PENDING,
      };

      dispatch(addTask(newTask));
    }
    reset({
      title: '',
      description: '',
      deadline: '',
    });
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          alignItems: 'flex-start',
          '@media (max-width: 800px)': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Box>
          <FormControl sx={{ width: '250px' }}>
            <FormLabel>Title</FormLabel>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  id="title"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ''}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl sx={{ width: '250px' }}>
            <FormLabel>Description</FormLabel>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  id="description"
                  variant="outlined"
                  error={!!errors.description}
                  helperText={
                    errors.description ? errors.description.message : ''
                  }
                />
              )}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl sx={{ width: '250px' }}>
            <FormLabel>Deadline</FormLabel>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="datetime-local"
                  id="deadline"
                  variant="outlined"
                  error={!!errors.deadline}
                  helperText={errors.deadline ? errors.deadline.message : ''}
                />
              )}
            />
          </FormControl>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ height: '56px', mt: '22px', width: '120px' }}
        >
          Submit
        </Button>
      </Box>
      <TasksList selectTaskHandler={selectTaskHandler} tasks={tasks} />
    </Box>
  );
};

export default CreateTask;
