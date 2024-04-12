import Footer from "@/components/footer";

export default function CartLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="relative flex flex-col items-center justify-center gap-4">
			<div className="absolute h-full w-full bg-[radial-gradient(#000000_1px,transparent_3px)] dark:bg-[radial-gradient(#e5e7eb_1px,transparent_3px)] dark:md:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
			<section className="max-w-5xl text-center justify-center min-h-[calc(100dvh-361px)] md:min-h-[calc(100vh-373px)] pt-8 ">
				{children}
			</section>
			<Footer />
		</section>
	);
}
