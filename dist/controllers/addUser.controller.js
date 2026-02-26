import {} from "express";
import { prisma } from "../lib/prisma.js";
export const addUser = async (req, res) => {
    try {
        const { email, password } = req.body;
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
        }
        else
            return res.json({ user });
    }
    catch (e) {
        console.log(e);
        return res.json({ message: "Unexpected error" });
    }
};
//# sourceMappingURL=addUser.controller.js.map