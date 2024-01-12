import React, { useReducer, useState } from 'react';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './state/todolists-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
  id: string,
  title: string,
  filter: 'all' | 'completed' | 'active',
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to buy", filter: 'all' },
    { id: todolistId2, title: "What to learn", filter: 'all' },
  ]);
  let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "css", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "REACT", isDone: false },
      { id: v1(), title: "redux", isDone: false },
      { id: v1(), title: "TS", isDone: true },],
    [todolistId2]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "milk", isDone: false },],
  });

  function removeTask(id: string, todolistId: string) {
    dispatchTasksReducer(removeTaskAC(id, todolistId));
  };
  function addTask(title: string, todolistId: string) {
    dispatchTasksReducer(addTaskAC(title, todolistId));
  }
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatchTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId));
  }
  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    dispatchTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
  }
  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchTodolistsReducer(ChangeTodolistFilterAC(value, todolistId));
  }
  function removeTodolist (todolistId: string) {
    const action = RemoveTodolistAC(todolistId);
    dispatchTasksReducer(action);
    dispatchTodolistsReducer(action);
  }
  function changeTodolistTitle(id: string, newTitle: string) {
    const action = ChangeTodolistTitleAC(id, newTitle)
    dispatchTodolistsReducer(action)
  }
  function addTodolist(title: string) {
    const action = AddTodolistAC(title);
    dispatchTasksReducer(action);
    dispatchTodolistsReducer(action);
  }



  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px',}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {
            todolists.map((tl) => {
              let tasksForTodolist = tasksObj[tl.id];

              if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
              }
              if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
              }

              return (
                <Grid item>
                  <Paper style={ { padding:'10px' } }>
                    <Todolist
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeTodolistTitle={changeTodolistTitle}
                      changeTaskTitle={changeTaskTitle}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>

    </div>
  );
}


export default AppWithReducers;
