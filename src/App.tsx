import React, { useState } from 'react';
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

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
  id: string,
  title: string,
  filter: 'all' | 'completed' | 'active',
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "what to buy", filter: 'all' },
    { id: todolistId2, title: "what to learn", filter: 'all' },
  ]);
  let [tasksObj, setTasks] = useState<TasksStateType>({
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
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  };
  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];

    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);

    if (task) {
      task.isDone = !task.isDone;
      setTasks({ ...tasksObj });
    };
  }
  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);

    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    };
  }
  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  function removeTodolist (todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }
  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }
  function addTodolist(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title,
    }
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
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


export default App;
