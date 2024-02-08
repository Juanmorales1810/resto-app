import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/mongodb";
import Menu from "@/models/listprice";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { categoryId } = req.query;

        if (!categoryId) {
            return res.status(400).json({ message: "categoryId es requerido" });
        }

        try {
            await connectMongoDB();
            const menu = await Menu.findOne();
            const category = menu.categories.id(categoryId);

            return res.status(200).json(category.subcategories);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error al obtener las subcategorías" });
        }
    }

    return res.status(405).json({ message: "Método no permitido" });
}
