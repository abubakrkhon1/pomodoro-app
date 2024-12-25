'use client'
import { ThemeProvider } from "../components/custom/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css"; // Global styles

import MainHeadNav from "@/components/custom/MainHeadNav";
import SideNav from "@/components/custom/SideNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pages = [
  { name: "Home", link: "/" },
  { name: "Settings", link: "/dashboard/settings" },
  { name: "About", link: "/dashboard/about" },
  { name: "Profile", link: "/dashboard/profile" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Add global layout here */}
          <div className="w-full h-screen">
              <MainHeadNav />
            <div className="h-screen">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}