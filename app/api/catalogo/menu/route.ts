import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/mongodb";
import Menu from "@/models/listprice";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            await connectMongoDB();
            const menu = await Menu.findOne();
            return res.status(200).json(menu);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error al obtener el menú" });
        }
    }

    return res.status(405).json({ message: "Método no permitido" });
}
