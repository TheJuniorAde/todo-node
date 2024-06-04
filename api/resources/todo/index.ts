import { Application } from "express"
import { addTodo } from "./add"
import { listTodo } from "./list"
import { getTodo } from "./get"
import { deleteTodo } from "./delete"
import { editTodo } from "./edit"

const routes = (server: Application) => {
  server.get("/api/todo", listTodo)
  server.get("/api/todo/:id", getTodo)
  server.put("/api/todo", addTodo)
  server.patch("/api/todo/:id", editTodo)
  server.delete("/api/todo/:id", deleteTodo)
}

export default { routes }
