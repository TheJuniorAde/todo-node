import { Optional } from "sequelize/types"

export interface TodoAttr {
  id: number
  name: string
  status: "pending" | "finished"
}

export interface TodoId {
  id: string
}

export interface TodoResponseBody {
  success: boolean
  data?: TodoAttr | null
  error?: any
}

export type TodoResponseBodyArray = TodoResponseBody & {
  result: Array<TodoAttr>
}

export type TodoCreationAttr = Optional<TodoAttr, "id">
