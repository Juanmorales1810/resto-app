"use client"

import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
	const [tableNum, setTableNum] = useState(1)
	return (
		<div>
			<h1 className={title()}>Escoge tu mesa</h1>
			<div className="flex flex-col justify-center gap-4 items-center mt-20">
				<h2 className="text-4xl font-medium ">Mesa {tableNum}</h2>
				<div className="flex gap-4 mt-8">
					<Button color="secondary" className="font-semibold" onClick={() => tableNum > 1 && setTableNum(tableNum - 1)}>Disminuir</Button>
					<Button color="secondary" className="font-semibold" onClick={() => setTableNum(tableNum + 1)}>Aumentar</Button>
				</div>
				<Divider />
				<Button href={`/cart/${tableNum.toString()}`} as={Link} color="primary" variant="shadow" className="mb-8" >Escoger mesa</Button>
			</div>
			<p>Es importante escoger una mesa <strong>correcta</strong> para poder ordenar y que el sistema funcione correctamente.</p>
		</div>
	);
}
