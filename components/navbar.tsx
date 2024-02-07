"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import Image from "next/image";
import {
    Navbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";

export const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" color="foreground" size="lg">
                        <Image className="dark:invert" src="/logoresto2.webp" alt="Logo" width="150" height="300" priority />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {siteConfig.navItems.map((link, index) => (
                    <NavbarItem key={`${link}-${index}`}>
                        <Link color="foreground" href={link.href}>
                            {link.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="flex">
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {siteConfig.navItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={"primary"}
                            className="w-full"
                            href={item.href}
                            size="lg"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};
