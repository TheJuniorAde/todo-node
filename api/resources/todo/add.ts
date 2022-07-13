import { RequestHandler } from "express";
import TodoRepository from "../../models/todo";
import { TodoAttr } from "../../types/todo";

export const addTodo: RequestHandler<{}, {}, TodoAttr> = async (req, res) => {
  try {
    const { body } = req;
    const result = await TodoRepository.create(body);
    res.json({ success: true, data: result.get() });
  } catch (error) {
    res.json({ success: false, error, data: null });
  }
};
