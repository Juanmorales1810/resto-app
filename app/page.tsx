
import { Nav } from "@/components/navbar";
import Swipe from "@/components/swiper";
import Blogs from "@/components/blogs";
import CardSpotlight from "@/components/card";
import Footer from "@/components/footer";


export default function Home() {
    return (
        <section className="relative h-full w-full flex flex-col items-center justify-center">
            <div className="absolute h-full w-full bg-[radial-gradient(#000000_1px,transparent_3px)] dark:bg-[radial-gradient(#e5e7eb_1px,transparent_3px)] dark:md:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <Nav />
            <section className="h-auto max-h-[calc(100vh-64px)] w-full">
                <Swipe />
            </section>
            <section className="flex flex-col justify-center items-center mt-8 px-2">
                <div className="flex justify-center items-center w-auto px-8 py-2 backdrop-blur-sm bg-black/5 rounded-full ring-1 ring-zinc-500 hover:backdrop-brightness-150 transition-[backdrop-filter] ease-in-out">
                    <h2 className="text-lg md:text-4xl font-semibold pb-1">Nuestros mejores productos a tus manos</h2>
                </div>
                <Blogs />
            </section>
            <section className="py-10 px-2">
                <CardSpotlight />
            </section>
            <Footer />
        </section>
    );
}
