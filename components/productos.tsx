'use client';

import { useCallback, useMemo, useState } from "react";
import CardItem from "./cardItem";
import { Input, Tabs, Tab } from "@nextui-org/react";
import { SearchIcon } from "./icons";

interface ProductProps {
    products: ProductItem[];
    table: string;
}
interface ProductItem {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;

}
export default function Product(props: ProductProps) {
    const { products, table } = props;
    const [filterValue, setFilterValue] = useState("");
    const [selected, setSelected] = useState("all");
    const hasSearchFilter = Boolean(filterValue);
    const filteredItems = useMemo(() => {
        let filteredUsers = [...products];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((product) =>
                product.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredUsers;
    }, [products, filterValue]);
    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);

        } else {
            setFilterValue("");
        }
    }, []);
    const onClear = useCallback(() => {
        setFilterValue("")
    }, [])

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <Input
                isClearable
                className="w-full sm:max-w-[400px]"
                placeholder="Buscar nombre del producto..."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
                classNames={{
                    input: ["text-white text-lg font-semibold"],
                    inputWrapper: [
                        "shadow-xl",
                        "bg-zinc-800",
                        "!cursor-text",
                    ],
                }}
            />
            <Tabs
                aria-label="Options"
                variant="bordered"
                color="warning"
                selectedKey={selected}
                //@ts-ignore
                onSelectionChange={setSelected}
                className="font-bold backdrop-blur-sm bg-black/5"
            >
                <Tab key="all" title="Todo">
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        {filteredItems.map((product: ProductItem) => (
                            <CardItem key={product._id} title={product.name} description={product.description} image={product.image} price={product.price} table={table} id={product._id} />
                        ))}
                    </div>
                </Tab>
                <Tab key="comida" title="Comida">
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        {filteredItems.map((product: ProductItem) => (
                            product.category === "comida" &&
                            <CardItem key={product._id} title={product.name} description={product.description} image={product.image} price={product.price} table={table} id={product._id} />
                        ))}
                    </div>
                </Tab>
                <Tab key="bebida" title="Bebida">
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        {filteredItems.map((product: ProductItem) => (
                            product.category === "bebida" &&
                            <CardItem key={product._id} title={product.name} description={product.description} image={product.image} price={product.price} table={table} id={product._id} />
                        ))}
                    </div>
                </Tab>
            </Tabs>

        </div>
    )
}