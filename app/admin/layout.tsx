"use client";
import { Logo } from "@/components/icons";
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

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [expanded, setExpanded] = useState(true);
    const [mobile, setMobile] = useState(false);
    const sidebar = useSidebar();
    return (
        <div className="relative flex flex-row w-full h-full min-h-[35rem]">
            <Sidebar
                onToggle={(state: SidebarState) => {
                    setExpanded(state.expanded);
                    setMobile(state.mobile);
                }}
            >
                <Sidebar.Head>
                    <Sidebar.Head.Logo>
                        <Image
                            src="/favicon.ico"
                            width={48}
                            height={48}
                            alt="Rewind-UI"
                        />
                    </Sidebar.Head.Logo>
                    <Sidebar.Head.Title>Resto</Sidebar.Head.Title>
                </Sidebar.Head>

                <Sidebar.Nav>
                    <Sidebar.Nav.Section>
                        <Sidebar.Nav.Section.Item
                            icon={<Logo />}
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
                            icon={<Logo />}
                            label="Ordenes"
                            href="/admin/ordenes"
                            as={Link}
                        />
                        <Sidebar.Nav.Section.Item
                            icon={<Logo />}
                            label="Chat"
                            href="/admin/chat"
                            as={Link}
                        />
                        <Sidebar.Nav.Section.Item
                            icon={<Logo />}
                            label="Lista de precios"
                            href="/admin/price"
                            as={Link}
                        />
                        <Sidebar.Nav.Section.Item
                            icon={<Logo />}
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
                            icon={<Logo />}
                            label="Contacto"
                            href="#"
                        />
                        <Sidebar.Nav.Section.Item
                            icon={<Logo />}
                            label="Tickets"
                            href="#"
                        />
                        <Sidebar.Separator />
                        <Sidebar.Nav.Section.Item
                            icon={<Logo />}
                            label="Documentación"
                            href="#"
                        />
                    </Sidebar.Nav.Section>
                </Sidebar.Nav>

                <Sidebar.Footer>
                    <div className="flex flex-col justify-center items-center text-sm">
                        <span className="font-semibold">Admin</span>
                        <span>version 1.0.0</span>
                    </div>
                </Sidebar.Footer>
            </Sidebar>

            <main
                className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center ${
                    expanded ? "md:ml-64" : "md:ml-20"
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

                <div className="w-full h-full p-4">{children}</div>
            </main>
        </div>
    );
}
