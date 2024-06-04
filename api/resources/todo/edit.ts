import { RequestHandler } from "express"
import TodoRepository from "../../models/todo"
import { TodoAttr, TodoId, TodoResponseBody } from "../../types/todo"

export const editTodo: RequestHandler<
  TodoId,
  TodoResponseBody,
  TodoAttr
> = async (req, res) => {
  try {
    const { body } = req
    const { id } = req.params
    const todo = await TodoRepository.findByPk(Number(id))

    if (!todo) {
      throw "Tarefa não encontrada!"
    }

    const result = await todo.update(body)

    res.json({ success: true, data: result.get() })
  } catch (error) {
    res.json({ success: false, error, data: null })
  }
}
