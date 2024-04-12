"use client";

import { useLoading } from "@/hooks/useLoading";
import { Image, Button, Link } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { AddIcon, SubtractIcon } from "./icons";

interface ItemProps {
    id?: string;
    title: string;
    description: string;
    price: number;
    image: string;
    table: string;
}

export default function Items(props: ItemProps) {
    const [multiplier, setMultiplier] = useState(1)
    const { title, description, price, image, id, table } = props;
    const router = useRouter()
    const { finishLoading, isLoading, startLoading } = useLoading()
    const product = {
        id: id,
        title: multiplier > 1 ? `${title} x${multiplier}` : title,
        price: price * multiplier,
        picture_url: image,
        description: table
    };
    const handleClick = async () => {
        startLoading()
        try {
            const response = await axios.post('/api/checkout', product);
            console.log(response.data.init_point);
            router.push(response.data.init_point)
        } catch (error) {
            console.error(error);
        }
        finishLoading()
    };
    return (
        <div className="backdrop-blur-sm bg-black/5 p-4 rounded-md ring-1 ring-zinc-900">
            <h1 className="text-5xl font-bold uppercase text-warning-400 mb-6">{title}</h1>
            <div className="flex flex-col w-full gap-8 max-w-5xl md:flex-wrap">
                <div className="flex justify-center items-center">
                    <Image src={image} alt={title} width={300} height={300} isBlurred />
                </div>
                <div className="flex flex-col justify-star items-center gap-2">
                    <h2 className="text-2xl font-semibold">{description}</h2>
                    <h3 className="text-xl font-medium">${price} <small>c/u</small></h3>
                    <h3 className="text-xl font-medium">Cantidad</h3>
                    <div className="flex justify-center items-center gap-2">
                        <Button isIconOnly color={multiplier === 1 ? "default" : "warning"} aria-label="Añadir" onClick={() => multiplier > 1 && setMultiplier(multiplier - 1)}>
                            <SubtractIcon />
                        </Button>
                        <h2 className="text-xl font-medium ">{multiplier}</h2>
                        <Button isIconOnly color="warning" aria-label="Restar" onClick={() => setMultiplier(multiplier + 1)}>
                            <AddIcon />
                        </Button>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <h3 className="text-xl font-medium">Total: ${price * multiplier}</h3>
                        <Button color="warning" variant="shadow" className="font-bold" isLoading={isLoading} onClick={handleClick}>Comprar</Button>
                    </div>
                </div>
                <Link href={`/cart/${table}`} color="warning" >Volver</Link>
            </div>
        </div>
    )
}