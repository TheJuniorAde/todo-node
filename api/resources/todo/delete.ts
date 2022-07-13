import { RequestHandler } from "express";
import TodoRepository from "../../models/todo";
import { TodoId } from "../../types/todo";

export const deleteTodo: RequestHandler<TodoId> = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoRepository.findByPk(Number(id));

    if (!todo) {
      throw "Tarefa não encontrada!";
    }

    await todo.destroy();

    res.json({ success: true, data: null });
  } catch (error) {
    res.json({ success: false, error, data: null });
  }
};
