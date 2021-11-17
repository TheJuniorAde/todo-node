import {RequestHandler} from 'express'
import TodoRepository from '../../models/todo'

export const addTodo: RequestHandler<{}, {}, {id: number, name: string, status: 'pending' | 'finished'}> = async (req, res, next) => {
    try {
        const {body} = req
        const result = await TodoRepository.create(body)
        res.json({success: true, data: result.get()})
    } catch (error) {
        res.json({success: false, error, data: null})
    }
}