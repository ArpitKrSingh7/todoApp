import {} from "express";
import { prisma } from "../lib/prisma.js";
export const addTodo = async (req, res) => {
    try {
        let { id, todo, status } = req.body;
        if (typeof id != "number" || typeof todo != "string") {
            return res.json({ message: "Wrong input Types" });
        }
        if (!status)
            status = false;
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
        return res.json({ addTodo });
    }
    catch (e) {
        console.log(e);
        return res.json({ message: "Internal Server Error" });
    }
};
//# sourceMappingURL=addTodo.controller.js.map