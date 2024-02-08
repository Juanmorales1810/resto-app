"use client";
import { Chat, Contact, Dev, Home, Logo, Logout, Order, PriceList, Returns, Ticket } from "@/components/icons";
import {
    Sidebar,
    useSidebar,
    Overlay,
    SidebarState,
    Button,
} from "@rewind-ui/core";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [expanded, setExpanded] = useState(true);
    const [mobile, setMobile] = useState(false);
    const sidebar = useSidebar();
    const router = useRouter()
    const logout = async () => {
        try {
            const res = await axios.delete('/api/auth/logout');

            if (res.status === 200) {
                router.push('/guard');
            }
        } catch (error) {
            console.error('Error al cerrar la sesión', error);
        }
    };
    return (
        <div className="relative flex flex-row w-full h-full min-h-[35rem]">
            <Sidebar color="dark"
                onToggle={(state: SidebarState) => {
                    setExpanded(state.expanded);
                    setMobile(state.mobile);
                }}
            >
                <Sidebar.Head>
                    <Sidebar.Head.Logo>
                        <Image
                            src="/logo2.webp"
                            width={48}
                            height={48}
                            alt="Lo del pibe"
                        />
                    </Sidebar.Head.Logo>
                    <Sidebar.Head.Title>Lo del pibe</Sidebar.Head.Title>
                </Sidebar.Head>

                <Sidebar.Nav>
                    <Sidebar.Nav.Section>
                        <Sidebar.Nav.Section.Item
                            icon={<Home />}
                            label="Inicio"
                            href="/admin"
                            as={Link}
                        />
                    </Sidebar.Nav.Section>

                    <Sidebar.Nav.Section>
                        <Sidebar.Nav.Section.Title>
                            Gestión
                        </Sidebar.Nav.Section.Title>
                        <Sidebar.Nav.Section.Item
                            icon={<Order />}
                            label="Ordenes"
                            href="/admin/ordenes"
                            as={Link}
                        />
                        <Sidebar.Nav.Section.Item
                            icon={<Chat />}
                            label="Chat"
                            href="/admin/chat"
                            as={Link}
                        />
                        <Sidebar.Nav.Section.Item
                            icon={<PriceList />}
                            label="Lista de precios"
                            href="/admin/price"
                            as={Link}
                        />
                        <Sidebar.Nav.Section.Item
                            icon={<Returns />}
                            label="Rendiminetos"
                            href="/admin/returns"
                            as={Link}
                        />
                    </Sidebar.Nav.Section>

                    <Sidebar.Nav.Section>
                        <Sidebar.Nav.Section.Title>
                            Soporte
                        </Sidebar.Nav.Section.Title>
                        <Sidebar.Nav.Section.Item
                            icon={<Contact />}
                            label="Contacto"
                            href="#"
                        />
                        <Sidebar.Nav.Section.Item
                            icon={<Ticket />}
                            label="Tickets"
                            href="#"
                        />
                        <Sidebar.Separator />
                        <Sidebar.Nav.Section.Item
                            icon={<Dev />}
                            label="Documentación"
                            href="#"
                        />
                        <Sidebar.Separator />
                        <Sidebar.Nav.Section.Item
                            icon={<Logout />}
                            label="Cerrar sesión"
                            href="#"
                            as={Button}
                            onClick={logout}
                        />
                    </Sidebar.Nav.Section>
                </Sidebar.Nav>

                <Sidebar.Footer>
                    <div className="flex flex-col justify-center items-center text-sm">
                        <span className="font-semibold">Admin</span>
                        <span>version 1.0.0</span>
                        <span>© 2024</span>
                    </div>
                </Sidebar.Footer>
            </Sidebar>

            <main
                className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center ${expanded ? "md:ml-64" : "md:ml-20"
                    }`}
            >
                {mobile && (
                    <Overlay
                        blur="none"
                        onClick={() => {
                            sidebar.toggleMobile();
                        }}
                        className="md:hidden z-40"
                    />
                )}
                <header className="flex flex-row sticky top-0 px-8 items-center w-full shadow-sm min-h-[4rem]">
                    <span className="text-4xl text-white">Panel</span>

                    <Button
                        onClick={() => {
                            sidebar.toggleMobile();
                        }}
                        size="sm"
                        color="white"
                        icon
                        className="ml-auto flex md:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                        >
                            <path d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
                            <path
                                className="opacity-50"
                                d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
                            />
                        </svg>
                    </Button>
                </header>

                <div className="w-full h-[calc(100vh-64px)]  p-4">{children}</div>
            </main>
        </div>
    );
}
