import { Optional } from "sequelize/types";

export interface TodoAttr {
    id: number;
    name: string;
    status: 'pending' | 'finished'
}

export type TodoCreationAttr = Optional<TodoAttr, 'id'>