import { TodoListType, FilterValuesType } from "../types";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type:"REMOVE-TODOLIST"
  id: string
}
export type AddTodolistActionType = {
  type: "ADD-TODOLIST"
  title: string
  todolistId: string
}
type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE"
  title: string
  id: string
}
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER"
  id: string
  filter: FilterValuesType
}

type ActionsTypes =
	| AddTodolistActionType
	| RemoveTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodoListType> = [
	{ id: todolistId1, title: "Something todolist", filter: "all" },
	{ id: todolistId2, title: "Something todolist", filter: "all" },
];

export const todolistsReducer = (
	state: Array<TodoListType> = initialState,
	action: ActionsTypes
): Array<TodoListType> => {
	switch (action.type) {
	case "REMOVE-TODOLIST": {
		return state.filter((tl) => tl.id != action.id);
	}
	case "ADD-TODOLIST": {
		return [
			{
				id: action.todolistId,
				title: action.title,
				filter: "all",
			},
			...state,
		];
	}
	case "CHANGE-TODOLIST-TITLE": {
		const todolist = state.find((tl) => tl.id === action.id);
		if (todolist) {
			todolist.title = action.title;
		}
		return [ ...state ]; 
	}
	case "CHANGE-TODOLIST-FILTER": {
		const todolist = state.find((tl) => tl.id === action.id);
            
		if (todolist) {
			todolist.filter = action.filter;
		}
		return [...state];
	}
	default:
		return state;
	}
};

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return {type: "REMOVE-TODOLIST", id: todolistId};
};
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
	return { type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1() };
};
export const ChangeTodolistTitleAC = (id: string, newTodolistTitle: string ): ChangeTodolistTitleActionType => {
	return { type: "CHANGE-TODOLIST-TITLE", title: newTodolistTitle, id: id };
};

export const ChangeTodolistFilterAC = (
	newFilter: FilterValuesType,
	id: string
): ChangeTodolistFilterActionType => {
	return { type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: id };
};