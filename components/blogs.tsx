"use client";

import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React from "react";


export default function Blogs() {
    return (
        <div className="w-auto max-w-7xl gap-4 grid grid-cols-12 grid-rows-2 pt-16">
            <Card className="col-span-12 sm:col-span-4 h-[400px]">
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/instagram-cuadrada.jpg"
                />
            </Card>
            <Card className="col-span-12 sm:col-span-4 h-[400px]">
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/instagram-cuadrada1.jpg"
                />
            </Card>
            <Card className="col-span-12 sm:col-span-4 h-[400px]">
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/instagram-cuadrada2.jpg"
                />
            </Card>
            <Card isFooterBlurred className="w-full h-[320px] col-span-12 sm:col-span-6">
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full object-cover"
                    src="/instagram-cuadrada3.jpg"
                />
            </Card>
            <Card isFooterBlurred className="w-full h-[320px] col-span-12 sm:col-span-6">
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover"
                    src="/instagram-cuadrada4.jpg"
                />
            </Card>
        </div>
    )
}