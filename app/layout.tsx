import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/smooth-cursor";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "SAP Community Kolkata 2026 – Certificate Portal",
  description: "Download your SAP Community Kolkata participation certificate",
  icons: { icon: "icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
