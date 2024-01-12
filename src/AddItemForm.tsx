import { Button } from "@mui/material";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import { ControlPoint } from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export default function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    };
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }
    }
    const [error, setError] = useState<string | null>(null);
    return (
        <div>
            <TextField value={newTaskTitle}
                variant="outlined"
                label="Type value"
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />

            <IconButton color="primary" onClick={addTask}>
                <ControlPoint />
            </IconButton>
        </div>
    )
}