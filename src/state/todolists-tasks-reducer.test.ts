import { TasksStateType, TodoListType } from "../types";
import { tasksReducer } from "./tasks-reducer";
import { AddTodolistAC, todolistsReducer } from "./todolists-reducer";

test("ids should be equals" , () => {
	const startTasksState: TasksStateType = {};
	const startTodolistState: Array<TodoListType> = [];
	const action = AddTodolistAC("new todolist");

	const endTasksState = tasksReducer(startTasksState, action);
	const endTodolistsState = todolistsReducer(startTodolistState, action);

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.todolistId);
	expect(idFromTodolists).toBe(action.todolistId);
});

