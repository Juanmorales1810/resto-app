import Footer from "@/components/footer";

export default function CartLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 pt-8">
			<section className="max-w-5xl text-center justify-center min-h-[calc(100dvh-361px)] md:min-h-[calc(100vh-373px)] ">
				{children}
			</section>
			<Footer />
		</section>
	);
}
