"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css/pagination';
import '@/styles/globals.css';
import 'swiper/css';

export default function Swipe() {
    return (
        <>
            <Swiper spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper">
                <SwiperSlide><Image src="/9916733.jpg" alt='img' width={1856} height={1080} /></SwiperSlide>
                <SwiperSlide><Image src="/99167333.jpg" alt='img' width={1856} height={1080} /></SwiperSlide>
                <SwiperSlide><Image src="/99167332.jpg" alt='img' width={1856} height={1080} /></SwiperSlide>
            </Swiper>
        </>
    );
}