import { RequestHandler } from "express"
import TodoRepository from "../../models/todo"
import { TodoId, TodoResponseBody } from "../../types/todo"

export const getTodo: RequestHandler<TodoId, TodoResponseBody> = async (
  req,
  res
) => {
  try {
    const { id } = req.params
    const todo = await TodoRepository.findByPk(Number(id))

    if (!todo) {
      throw "Tarefa não encontrada!"
    }

    res.json({ success: true, data: todo.get() })
  } catch (error) {
    res.json({ success: false, error, data: null })
  }
}
