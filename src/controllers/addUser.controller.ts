import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

interface Body {
  email: string;
  password: string;
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as Body;

    if (typeof email != "string" || typeof password != "string") {
      res.json({ message: "Wrong input types" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      res.json({ message: "error while creating User" });
      return;
    } else return res.json({ user });
  } catch (e) {
    console.log(e);
    return res.json({ message: "Unexpected error" });
  }
};
