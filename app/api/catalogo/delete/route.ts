import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/mongodb";
import Menu from "@/models/listprice";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        const { categoryId, subcategoryId, itemId } = req.body;

        if (!categoryId || !subcategoryId || !itemId) {
            return res
                .status(400)
                .json({ message: "Todos los campos son requeridos" });
        }

        try {
            await connectMongoDB();
            const menu = await Menu.findOne();
            const category = menu.categories.id(categoryId);
            const subcategory = category.subcategories.id(subcategoryId);

            subcategory.items.id(itemId).remove();

            await menu.save();

            return res
                .status(200)
                .json({ message: "Item eliminado exitosamente" });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error al eliminar el item" });
        }
    }

    return res.status(405).json({ message: "Método no permitido" });
}
