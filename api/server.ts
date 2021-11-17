import express from "express";
import cors from "cors";
import todo from "./resources/todo";
import db from "./db";

// rest of the code remains same
const app = express();
const PORT = 8000;
app.get("/", (req, res) => res.send("Express + TypeScript Serversddd"));
app.use(express.json());
app.use(cors());
todo.routes(app);

db.sync();

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
