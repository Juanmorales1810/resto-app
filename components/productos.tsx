'use client';

import CardItem from "./cardItem";

interface ProductProps {
    products: ProductItem[];
}
interface ProductItem {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;

}
export default function Product(props: ProductProps) {
    const { products } = props;

    return (
        <div className="flex flex-wrap justify-center items-center gap-4">
            {products.map((product: ProductItem) => (
                <CardItem key={product._id} title={product.name} description={product.description} image={product.image} price={product.price} />
            ))}
        </div>
    )
}