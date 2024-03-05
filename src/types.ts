
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
  id: string
  title: string
  filter: "all" | "completed" | "active"
}

export type TasksStateType = {
  [key: string]: TaskType[]
}


