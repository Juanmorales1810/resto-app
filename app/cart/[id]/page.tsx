"use client";

import { useAsyncList } from "@react-stately/data";
import CardItem from "@/components/cardItem";
import { Image, Spinner } from "@nextui-org/react";
import { useState } from "react";

interface BlogParams {
    id: string;
}
export default function TableMenu({ params }: { params: BlogParams }) {

    const [isLoading, setIsLoading] = useState(true);
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
    let list = useAsyncList({
        async load({ signal }) {
            let res = await fetch('http://localhost:3000/api/catalogo', {
                signal,
            });
            let json = await res.json();

            setIsLoading(false);
            return {
                items: json,
            };
        }
    })
    const products = list.items;


    return (
        <section className="flex flex-wrap justify-center items-center gap-4">
            {isLoading ? <Spinner label="Cargando..." size="lg"></Spinner> : products.map((product: any, key) => {
                return <CardItem key={product._id} title={product.name} description={product.description} image={product.image} price={product.price} />
            })}
        </section>
    );
}