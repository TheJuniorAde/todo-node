import { RequestHandler } from "express"
import TodoRepository from "../../models/todo"
import { TodoAttr, TodoResponseBody } from "../../types/todo"

export const addTodo: RequestHandler<{}, TodoResponseBody, TodoAttr> = async (
  req,
  res
) => {
  try {
    const { body } = req
    const result = await TodoRepository.create(body)
    res.json({ success: true, data: result.get() })
  } catch (error) {
    res.json({ success: false, error, data: null })
  }
}
