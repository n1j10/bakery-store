import type { Metadata } from "next";
import { Reem_Kufi, Tajawal } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/global/Footer";
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/global/Container";
import { Toaster } from "@/components/ui/sonner";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});

const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-reem-kufi",
});

export const metadata: Metadata = {
  title: "مخبز السنابل",
  description: "حلويات ومعجنات وخبز طازج يومياً",
};

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn(tajawal.variable, reemKufi.variable, "min-h-screen flex flex-col overflow-x-clip")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <Container className="w-full flex-1 py-8 sm:py-12">
            {children}
          </Container>

          <Footer />

          <Toaster position="top-center" dir="rtl" />
        </ThemeProvider>
      </body>
    </html>
  );
}
