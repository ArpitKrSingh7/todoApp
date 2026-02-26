import { prisma } from "./lib/prisma.js";
import express from "express";

import { addUser } from "./controllers/addUser.controller.js";
import { addTodo } from "./controllers/addTodo.controller.js";
import { getTodos } from "./controllers/getTodos.controller.js";
const app = express();
app.use(express.json());

app.post("/adduser", addUser);
app.post("/addtodo", addTodo);
app.get("/gettodos", getTodos);

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
