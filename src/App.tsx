import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import RemovedTasks from './components/organisms/RemovedTasks';
import Task from './components/organisms/Task';
import { useDispatch } from 'react-redux';
import { checkOverdueTasks } from './redux/slices/task.slice';
import CustomTabPanel from './components/molecules/CustomTabPanel';
import a11yProps from './components/molecules/AllYProps';

export default function App() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkOverdueTasks());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Add a task" {...a11yProps(0)} />
          <Tab label="Trash" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Task />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '36px' }}>
          Removed tasks
        </Typography>
        <RemovedTasks />
      </CustomTabPanel>
    </Box>
  );
}
