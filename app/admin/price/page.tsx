
import React, { cache } from "react";
import TableItems from "@/components/table";
import { connectMongoDB } from "@/libs/mongodb";
import Menu from "@/models/listprice";


const getItems = cache(async function loadMenu() {
    await connectMongoDB();
    const ListProduct = await Menu.find();
    return ListProduct.map(product => {
        const obj = product.toObject();
        obj._id = obj._id.toString(); // Convierte _id a una cadena
        return obj;
    }); // Usa .toObject() para convertir cada producto a un objeto JavaScript simple
})

export default async function App() {
    const menu = await getItems();
    return (
        <div className="w-full">
            <TableItems products={menu} />
        </div>
    );
}
