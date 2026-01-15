import NavBarComponent from "@/components/header/NavBarComponent";
import StoreProvider from "@/lib/provider";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import Loading from "./loading";
import FooterComponent from "@/components/footer/FooterComponent";

const open_sans = Open_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuika",
  description: "E-Commerce website provide more than a million of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <StoreProvider>
          <NavBarComponent />
          <Suspense fallback={<Loading />}>
            {children}
            <Toaster position="top-center" />
          </Suspense>
          <FooterComponent />
        </StoreProvider>
      </body>
    </html>
  );
}
