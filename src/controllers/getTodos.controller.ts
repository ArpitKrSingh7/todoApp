import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

interface Body {
  id: number;
}

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as Body;
    if (typeof id != "number") return res.json({ message: "Wrong types" });

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        todos: true,
      },
    });

    if (!user) return res.json({ message: "Error HWile Finding Todos" });
    return res.json({ todos: user.todos });
  } catch (e) {
    console.log(e);
    return res.json({ message: "Internal Server error" });
  }
};
