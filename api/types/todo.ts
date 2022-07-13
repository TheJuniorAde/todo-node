import { Optional } from "sequelize/types";

export interface TodoAttr {
  id: number;
  name: string;
  status: "pending" | "finished";
}

export interface TodoId {
  id: string;
}

export type TodoCreationAttr = Optional<TodoAttr, "id">;
