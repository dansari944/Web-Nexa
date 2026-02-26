import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers"; // ✅ ADD THIS

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ChatterBuzz",
  description: "Modern Digital Marketing Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-gray-400`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {/* ✅ AUTH PROVIDER WRAP */}
        <Providers>
          <Navbar />

          <main
            className="transition-all duration-500"
            style={{ paddingTop: "var(--nav-height,112px)" }}
          >
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}