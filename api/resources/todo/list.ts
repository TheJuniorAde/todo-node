import {RequestHandler} from 'express'
import TodoRepository from '../../models/todo'

export const listTodo: RequestHandler = async (_req, res) => {
    try {
        const data = await TodoRepository.findAll()
        res.json({success: true, data: data.map(item => item.get())})
    } catch (error) {
        res.json({success: false, error, data: []})
    }
}