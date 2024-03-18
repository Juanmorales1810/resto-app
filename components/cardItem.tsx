import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { useLoading } from "@/hooks/useLoading";

interface CardItemProps {
    id?: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export default function CardItem(props: CardItemProps) {
    const { finishLoading, isLoading, startLoading } = useLoading()
    const router = useRouter()
    const { title, description, price, image, id } = props;
    const product = {
        id: id,
        title: title,
        price: price,
        picture_url: image,
        description: description
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
        <Card className="max-w-[200px] h-[300px] col-span-12 sm:col-span-7 bg-zinc-950">
            <CardHeader className="absolute z-10 h-auto flex-col items-start bg-gradient-to-b from-zinc-950/90 from-60% via-zinc-950/90 via-30%">

                <div className="flex flex-col w-full">
                    <p className="text-lg font-semibold text-yellow-400">{title}</p>
                </div>
            </CardHeader>


            <Image removeWrapper src={image} alt="image" radius="lg" shadow="md" className="z-0 w-full h-full object-cover hover:opacity-50 hover:scale-105 transition-opacity" />


            <CardFooter className="absolute bottom-0 z-10 bg-gradient-to-t from-zinc-950/90 via-zinc-950/90">
                <div className="flex justify-between items-center w-full">
                    <p className="text-lg font-bold">${price}</p>
                    <Button color="warning" variant="shadow" className="font-semibold" onClick={handleClick} isLoading={isLoading}>Comprar</Button>
                </div>
            </CardFooter>
        </Card>
    )
}