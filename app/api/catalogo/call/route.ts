import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/mongodb";
import Menu from "@/models/listprice";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { categoryId, subcategoryId } = req.query;

        if (!categoryId || !subcategoryId) {
            return res
                .status(400)
                .json({ message: "categoryId y subcategoryId son requeridos" });
        }

        try {
            await connectMongoDB();
            const menu = await Menu.findOne();
            const category = menu.categories.id(categoryId);
            const subcategory = category.subcategories.id(subcategoryId);

            return res.status(200).json(subcategory.items);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error al obtener los items" });
        }
    }

    return res.status(405).json({ message: "Método no permitido" });
}
