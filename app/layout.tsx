import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { EditModeProvider, EditToolbar, VisualEditPicker } from "@/lib/edit-mode";

// Outfit for headlines - bold, characterful
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

// Inter for body text - readable, professional
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Stape — Payroll that shouldn't exist",
  description: "Global contractor payroll. Stop doing payroll. Pay one person first. See what vanishes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <EditModeProvider>
          {children}
          <EditToolbar />
          <VisualEditPicker />
        </EditModeProvider>
      </body>
    </html>
  );
}
