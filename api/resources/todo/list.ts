import { RequestHandler } from "express"
import TodoRepository from "../../models/todo"
import { TodoAttr, TodoResponseBodyArray } from "../../types/todo"

export const listTodo: RequestHandler<{}, TodoResponseBodyArray> = async (
  _req,
  res
) => {
  try {
    const data = await TodoRepository.findAll()
    res.json({
      success: true,
      result: data.map((item) => item.get()) as TodoAttr[],
    })
  } catch (error) {
    res.json({ success: false, error, result: [] })
  }
}
