import {RequestHandler} from 'express'
import TodoRepository from '../../models/todo'

export const editTodo: RequestHandler<{id: string}, {}, {id: number, name: string, status: 'pending' | 'finished'}> = async (req, res, next) => {
    try {
        const {body} = req
        const {id} = req.params
        const todo = await TodoRepository.findByPk(Number(id))

        if (!todo) {
            throw 'Tarefa não encontrada!'
        }
        
        const result = await todo.update(body)

        res.json({success: true, data: result.get()})
    } catch (error) {
        res.json({success: false, error, data: null})
    }
}