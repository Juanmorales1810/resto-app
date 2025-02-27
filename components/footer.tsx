import { Image } from "@nextui-org/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full my-4 z-50">
            <div className="w-full max-w-screen-xl backdrop-blur bg-black/5 rounded-lg shadow-2xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex justify-center items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src="/logo2.webp" className="h-40" alt="Flowbite Logo" />
                    </Link>
                    <ul className="flex justify-center flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6">Licensing</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="flex justify-center text-sm text-gray-500 sm:text-center dark:text-gray-400 md:block">© 2023 <a href="https://flowbite.com/" className="hover:underline">Lodelpibe™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}