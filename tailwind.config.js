import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{html,jsx,tsx}",
        "./node_modules/@rewind-ui/core/dist/theme/styles/*.js",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [
        nextui(),
        require("@tailwindcss/typography"),
        require("tailwind-scrollbar")({ nocompatible: true }),
        require("@tailwindcss/forms")({
            strategy: "class", // only generate classes
        }),
    ],
};
