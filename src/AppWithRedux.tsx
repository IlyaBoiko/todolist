import React from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TodoListType, FilterValuesType, TasksStateType } from "./types";
import AddItemForm from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,  } from "./state/tasks-reducer";
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC,  } from "./state/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";




function AppWithRedux() {
	const dispatch = useDispatch();
	const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);
	const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);

	console.log(tasks);
  
	function removeTask(id: string, todolistId: string) {
		dispatch(removeTaskAC(id, todolistId));
	}
	function addTask(title: string, todolistId: string) {
		dispatch(addTaskAC(title, todolistId));
	}
	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
	}
	function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
		dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
	}
	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatch(ChangeTodolistFilterAC(value, todolistId));
	}
	function removeTodolist (todolistId: string) {
		const action = RemoveTodolistAC(todolistId);
		dispatch(action);
	}
	function changeTodolistTitle(id: string, newTitle: string) {
		const action = ChangeTodolistTitleAC(id, newTitle);
		dispatch(action);
	}
	function addTodolist(title: string) {
		const action = AddTodolistAC(title);
		dispatch(action);
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
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>News</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{padding: "20px",}}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={5}>
					{
						todolists.map(tl => {
							const allTodolistTasks = tasks[tl.id];
							let tasksForTodolist = allTodolistTasks;

							if (tl.filter === "active") {
								tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
							}

							if (tl.filter === "completed") {
								tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
							}
              

							return (
								<Grid item key={tl.id}>
									<Paper style={ { padding:"10px" } }>
										<Todolist
											key={tl.id}
											id={tl.id}
											title={tl.title}
											tasksForTodolist={tasksForTodolist}
											tasks={tasks}
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
							);
						})
					}
				</Grid>
			</Container>

		</div>
	);
}


export default AppWithRedux;
