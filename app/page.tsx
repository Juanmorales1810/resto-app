
import { Nav } from "@/components/navbar";
import Swipe from "@/components/swiper";
import Blogs from "@/components/blogs";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center">
            <Nav />
            <section className="h-auto max-h-[calc(100vh-64px)] w-full">
                <Swipe />
            </section>
            <section>
                <Blogs />
            </section>
            <section>

            </section>
        </section>
    );
}
