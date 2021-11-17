import {RequestHandler} from 'express'
import TodoRepository from '../../models/todo'

export const deleteTodo: RequestHandler<{id: string}> = async (req, res, next) => {
    try {
        const {id} = req.params
        const todo = await TodoRepository.findByPk(Number(id))

        if (!todo) {
            throw 'Tarefa não encontrada!'
        }

        await todo.destroy()

        res.json({success: true, data: null})
    } catch (error) {
        res.json({success: false, error, data: null})
    }
}