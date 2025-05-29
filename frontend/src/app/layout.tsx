'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../../assets/css/bootstrapskin.css'
import '../../assets/css/styles.css'

import Navbar from "@/components/navbar/navbar";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
           
             <AuthProvider>
              <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
