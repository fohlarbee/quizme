import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./context/ContextApi";
import {Toaster} from "react-hot-toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const popins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight:['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "QuizMe",
  description: "Share customizable quizzes with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>QuizMe</title>
      </head>

      <body
        className={`${popins.variable} antialiased`}
      >
        <ContextProvider>
           <main>{children}</main>
           <Toaster
           toastOptions={{
            duration:1000,
            className:'border-2 border-gray-200 shadow-lg border-opacity-5',
           }}
           />
         </ContextProvider>
      </body>
    </html>
  );
}
