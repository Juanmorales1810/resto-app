
import { Nav } from "@/components/navbar";
import Swipe from "@/components/swiper";
import Blogs from "@/components/blogs";
import CardSpotlight from "@/components/card";
import Footer from "@/components/footer";


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
            <section className="pb-8">
                <CardSpotlight />
            </section>
            <Footer />
        </section>
    );
}
