import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SAI Propysol",
  description: "Plataforma de Administración Integral para Propysol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
