import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

interface Body {
  id: number;
  todo: string;
  status?: boolean;
}

export const addTodo = async (req: Request, res: Response) => {
  try {
    let { id, todo, status } = req.body as Body;

    if (typeof id != "number" || typeof todo != "string") {
      return res.json({ message: "Wrong input Types" });
    }
    if (!status) status = false;

    const addedTodo = await prisma.todo.create({
      data: {
        todo: todo,
        userId: id,
        status: status,
      },
    });

    if (!addTodo) {
      return res.json({ message: "error while adding todo foe the user" });
    }
    return res.json({ addedTodo });
  } catch (e) {
    console.log(e);
    return res.json({ message: "Internal Server Error" });
  }
};
