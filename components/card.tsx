'use client';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import React, { useRef, useState } from 'react';

const CardSpotlight = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='relative flex h-auto w-auto max-w-7xl items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r from-black to-gray-950 shadow-2xl'
        >
            <div
                className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,0,.1), transparent 40%)`,
                }}
            />
            <div className='w-1/2 h-full'>
                <Image src='/local.jpg' isBlurred />
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 h-[360px] px-8 py-16 bg-[url('/map.webp')] bg-cover bg-center">
                <h1 className='text-3xl font-bold text-white'>Visitanos en nuestro local!</h1>
                <p className='text-lg text-gray-300'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Button className='mt-4 w-40' color='warning' variant='shadow' >
                    Abrir mapa
                </Button>
            </div>
        </div>
    );
};

export default CardSpotlight;