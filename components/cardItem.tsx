import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

interface CardItemProps {
    title: string;
    description: string;
    price: number;
    image: string;
}

export default function CardItem(props: CardItemProps) {
    const { title, description, price, image } = props;
    return (
        <Card className="w-[230px] h-[350px] col-span-12 sm:col-span-7 bg-zinc-950">
            <CardHeader className="absolute z-10 flex-col items-start bg-gradient-to-b from-zinc-950/80 from-60% via-zinc-950/80 via-30%">

                <div className="flex flex-col">
                    <p className="text-lg font-semibold text-yellow-400">{title}</p>
                    <p className="text-small font-medium text-white">{description}</p>
                </div>
            </CardHeader>


            <Image removeWrapper src={image} alt="image" radius="lg" shadow="md" className="z-0 w-full h-full object-cover hover:opacity-50 hover:scale-105 transition-opacity" />


            <CardFooter className="absolute bottom-0 z-10 flex justify-between bg-gradient-to-t from-zinc-950/90 via-zinc-950/90">
                <p className="text-lg font-bold">${price}</p>
                <Button color="warning" variant="shadow" className="font-semibold">Comprar</Button>
            </CardFooter>
        </Card>
    )
}