import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/mongodb";
import Menu from "@/models/listprice";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { categoryId, subcategoryId, itemName, itemPrice } = req.body;

        if (!categoryId || !subcategoryId || !itemName || !itemPrice) {
            return res
                .status(400)
                .json({ message: "Todos los campos son requeridos" });
        }

        try {
            await connectMongoDB();
            const menu = await Menu.findOne();
            const category = menu.categories.id(categoryId);
            const subcategory = category.subcategories.id(subcategoryId);

            subcategory.items.push({ name: itemName, price: itemPrice });

            await menu.save();

            return res
                .status(200)
                .json({ message: "Item agregado exitosamente" });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error al agregar el item" });
        }
    }

    return res.status(405).json({ message: "Método no permitido" });
}
