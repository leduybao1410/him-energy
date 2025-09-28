import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Him Energy - Future of Renewable Energy",
    description: "Pioneering sustainable and smart renewable energy solutions development.",
    keywords: "renewable energy, solar energy, wind energy, Him Energy, sustainable, green",
    authors: [{ name: "Him Energy" }],
    openGraph: {
        title: "Him Energy - Future of Renewable Energy",
        description: "Pioneering sustainable and smart renewable energy solutions development.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
