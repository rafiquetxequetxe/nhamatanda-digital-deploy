import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollNavigation from "@/components/ui/ScrollNavigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollNavigation />
      </body>
    </html>
  );
}


export const metadata: Metadata = {
  title: "Nhamatanda Digital | Administração Distrital de Nhamatanda",
  description: "Portal digital do Distrito de Nhamatanda - informação institucional, oportunidades de investimento, parcerias público-privadas e indicadores económicos.",
};
