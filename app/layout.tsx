import type { Metadata } from "next";
import {Inter, IBM_Plex_Serif} from 'next/font/google'
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['200','300', '400', '500']
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: [ '400', '700']
});

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon is a modern banking platform for everyone",
  icons:{
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable}  ${ibmPlexSerif.variable}   antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
