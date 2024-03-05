import { TasksStateType } from "../types";
import { v1 } from "uuid";

import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2, } from "./todolists-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK"
  taskId: string
  todolistId: string
}
type AddTaskActionType = {
  type: "ADD-TASK"
  newTasksTitle: string
  todolistId: string
}
type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS"
  isDone: boolean
  taskId: string
  todolistId: string
}
type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE"
  newTitle: string
  taskId: string
  todolistId: string
}


type ActionsTypes =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskTitleActionType
	| ChangeTaskStatusActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

const initialState: TasksStateType = {
	[todolistId1]: [
		{ id: v1(), title: "Something to do", isDone: true },
		{ id: v1(), title: "Something to do", isDone: true },
		{ id: v1(), title: "Something to do", isDone: false },
		{ id: v1(), title: "Something to do", isDone: false },
		{ id: v1(), title: "Something to do", isDone: true },
	],
	[todolistId2]: [
		{ id: v1(), title: "Something to do", isDone: true },
		{ id: v1(), title: "Something to do", isDone: false },
	],
};

export const tasksReducer = (
	state: TasksStateType = initialState,
	action: ActionsTypes
): TasksStateType => {
	switch (action.type) {
	case "REMOVE-TASK": {
		const stateCopy = { ...state };
		const tasks = state[action.todolistId];
		const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
		stateCopy[action.todolistId] = filteredTasks;

		return stateCopy;
	}
	case "ADD-TASK": {
		const stateAddCopy = { ...state };
		const newTask = {
			id: v1(),
			title: action.newTasksTitle,
			isDone: false,
		};
		const addTasks = state[action.todolistId];
		const newTasks = [newTask, ...addTasks];
		stateAddCopy[action.todolistId] = newTasks;
		return stateAddCopy;
	}
	case "CHANGE-TASK-STATUS": {
		const stateChangeCopy = { ...state };
		const changeTasks = state[action.todolistId];
		const updatedTask = changeTasks.find((t) => t.id === action.taskId);
		if (updatedTask) {
			updatedTask.isDone = action.isDone;
		}
		return stateChangeCopy;
	}
	case "CHANGE-TASK-TITLE": {
		const stateTitleCopy = { ...state };
		const changeTitleTasks = state[action.todolistId];
		const updatedTitleTask = changeTitleTasks.find(
			(t) => t.id === action.taskId
		);
		if (updatedTitleTask) {
			updatedTitleTask.title = action.newTitle;
		}
		return stateTitleCopy;
	}
	case "ADD-TODOLIST": {
		const stateCopy = { ...state };
		stateCopy[action.todolistId] = [];

		return stateCopy;
	}
	case "REMOVE-TODOLIST": {
		const stateCopy = { ...state };
		delete stateCopy[action.id];

		return stateCopy;
	}
	default:
		return state;
	}
};


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return { type: "REMOVE-TASK", todolistId, taskId };
};
export const addTaskAC = (newTasksTitle: string, todolistId: string): AddTaskActionType => {
	return { type: "ADD-TASK", newTasksTitle, todolistId };
};
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return { type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId };
};

export const changeTaskTitleAC = (
	taskId: string,
	newTitle: string,
	todolistId: string
): ChangeTaskTitleActionType => {
	return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId };
};


