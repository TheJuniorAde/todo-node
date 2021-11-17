import { INTEGER, STRING, ENUM, Model } from "sequelize";
import db from "../db";
import { TodoAttr, TodoCreationAttr } from "../types/todo";

export default db.define<Model<TodoAttr, TodoCreationAttr>>("TodoEntities", {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: ENUM('pending', 'finsihed'),
      allowNull: false,
    },
  });