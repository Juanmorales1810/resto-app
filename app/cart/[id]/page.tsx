import { connectMongoDB } from "@/libs/mongodb";
import Product from "@/components/productos";
import { Image } from "@nextui-org/react";
import Menu from "@/models/listprice";
import { cache } from "react";



interface BlogParams {
    id: string;
}
const getItems = cache(async function loadMenu() {
    await connectMongoDB();
    const ListProduct = await Menu.find();
    return ListProduct.map(product => {
        const obj = product.toObject();
        obj._id = obj._id.toString(); // Convierte _id a una cadena
        return obj;
    }); // Usa .toObject() para convertir cada producto a un objeto JavaScript simple
})
export default async function TableMenu({ params }: { params: BlogParams }) {
    const menu = await getItems();
    const tableNum = [
        {
            mesa: "1",
            qr: "https://www.qr-code-generator.com/",
        },
        {
            mesa: "2",
            qr: "https://www.qr-code-generator.com/",
        },
        {
            mesa: "3",
            qr: "https://www.qr-code-generator.com/",
        }
    ]
    const foundBlog = tableNum.find((mesa) => mesa.mesa === params.id);
    if (!foundBlog) {
        return (
            <section className="flex flex-col justify-center items-center w-full mt-14 px-2">
                <h2
                    className={
                        " text-8xl font-bold bg-gradient-to-br from-amber-300 via-orange-300 to-yellow-500 bg-clip-text text-transparent"
                    }
                >
                    ERROR 404
                </h2>
                <h2 className=" py-8 text-xl font-semibold text-center text-black dark:text-white">
                    Mesa no encontrada, vuelve a escanear el QR o llama al mesero mas cercano.
                </h2>
                <Image
                    src="/cart/qrnofound.webp"
                    alt="qr no encontrado"
                    width={200}
                    height={200}
                    className="drop-shadow-[0_0px_20px_rgba(0,0,0,0.75)]"
                />
            </section>
        );
    }


    return (
        <section className="flex flex-wrap justify-center items-center">
            <Product products={menu} />
        </section>
    );
}