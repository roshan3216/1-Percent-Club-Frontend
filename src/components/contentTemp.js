import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Completed Tasks', value: 30 },
  { name: 'Pending Tasks', value: 20 },
  { name: 'Due Tasks', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const HomeUtil = () => {
  const [tasks, setTasks] = useState([]); // Replace with your task data

  const handleCompleteTask = (taskId) => {
    // Implement logic to mark a task as complete
  };

  const handleEditTask = (taskId) => {
    // Implement logic to edit a task
  };

  const handleDeleteTask = (taskId) => {
    // Implement logic to delete a task
  };

  const handleSortBy = (sortBy) => {
    // Implement logic to sort tasks based on the selected option
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography variant="h6">Complete Tasks</Typography>
            <Typography variant="h4">30</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography variant="h6">Pending Tasks</Typography>
            <Typography variant="h4">20</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography variant="h6">Due Tasks</Typography>
            <Typography variant="h4">50</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h6">Pie Chart</Typography>
            <PieChart width={400} height={200}>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h6">Todo List</Typography>
            {/* Implement sorting options */}
            <Button onClick={() => handleSortBy('dueTasks')}>Due Tasks</Button>
            <Button onClick={() => handleSortBy('todayTasks')}>Today's Tasks</Button>
            <Button onClick={() => handleSortBy('tomorrowTasks')}>Tomorrow's Tasks</Button>
            <Button onClick={() => handleSortBy('priority')}>Priority</Button>
            <Button onClick={() => handleSortBy('creationDate')}>Creation Date</Button>

            {/* Implement TaskItem for each task */}
            {tasks.map((task) => (
              <div key={task.id}>
                <Typography variant="h6">{task.title}</Typography>
                <Typography>{task.description}</Typography>
                <IconButton onClick={() => handleCompleteTask(task.id)}>Complete</IconButton>
                <IconButton onClick={() => handleEditTask(task.id)}>Edit</IconButton>
                <IconButton onClick={() => handleDeleteTask(task.id)}>Delete</IconButton>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeUtil;
