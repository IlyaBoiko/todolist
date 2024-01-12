import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"
import AddItemForm from "./AddItemForm"
import EditableSpan from "./EditableSpan"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void,
    filter: FilterValuesType,
    id: string,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, newTitle: string) => void,
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
            </h3>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon />
            </IconButton>
            <AddItemForm addItem={addTask} />
            <div>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id, props.id);
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone}
                            onChange={onChangeStatusHandler}
                        />
                        <EditableSpan onChange={onChangeTitleHandler} title={t.title} />
                        <IconButton onClick={onRemoveHandler} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color="secondary" onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} color="error" onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
};



