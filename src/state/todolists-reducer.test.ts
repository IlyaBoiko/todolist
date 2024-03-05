import { FilterValuesType, TodoListType } from "../types";
import { v1 } from "uuid";
import {
	AddTodolistAC,
	RemoveTodolistAC,
	ChangeTodolistTitleAC,
	ChangeTodolistFilterAC,
	todolistsReducer } from "./todolists-reducer";



test("user reducer should remove todolist", () => {
	const todolistId1 = v1();
	const todolistId2 = v1();

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: "what to buy", filter: "all" },
		{ id: todolistId2, title: "what to learn", filter: "all" },
	];
	const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test("user reducer should add todolist", () => {
	const todolistId1 = v1();
	const todolistId2 = v1();

	const newTodolistTitle = "New Todolist";

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: "what to buy", filter: "all" },
		{ id: todolistId2, title: "what to learn", filter: "all" },
	];
	const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle));

	expect(endState.length).toBe(3);
	expect(endState[0].title).toBe(newTodolistTitle);
	expect(endState[0].filter).toBe("all");
});

test("correct todolist should change name", () => {
	const todolistId1 = v1();
	const todolistId2 = v1();

	const newTodolistTitle = "New Todolist";

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: "what to buy", filter: "all" },
		{ id: todolistId2, title: "what to learn", filter: "all" },
	];
	const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle);
	const endState = todolistsReducer(startState, action);

	expect(endState[0].title).toBe("what to buy");
	expect(endState[1].title).toBe(newTodolistTitle);
    
});

test("correct todolist should change status", () => {
	const todolistId1 = v1();
	const todolistId2 = v1();

	const newFilter: FilterValuesType = "completed";

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: "what to buy", filter: "all" },
		{ id: todolistId2, title: "what to learn", filter: "all" },
	];
	const action = ChangeTodolistFilterAC(newFilter, todolistId2);
	const endState = todolistsReducer(startState, action);

	expect(endState[0].filter).toBe("all");
	expect(endState[1].filter).toBe(newFilter);
});
