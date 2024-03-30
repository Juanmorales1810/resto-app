import { connectMongoDB } from "@/libs/mongodb";
import Items from "@/components/items";
import Menu from "@/models/listprice";
import { cache } from "react";

interface Params {
    id: string;
    item: string;
}
interface ProductItem {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
}
const getItem = cache(async function loadMenu(params: string) {
    await connectMongoDB();
    const Product = await Menu.findById(params);
    const obj = Product.toObject();// Usa .toObject() para convertir cada producto a un objeto JavaScript simple
    obj._id = obj._id.toString(); // Convierte _id a una cadena
    return obj;
})

export default async function TableMenu({ params }: { params: Params }) {
    const Item: ProductItem = await getItem(params.item);

    return (
        <section className="p-2">
            <Items description={Item.description} image={Item.image} price={Item.price} title={Item.name} id={Item._id} table={params.id} />
        </section>
    )
}