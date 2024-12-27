import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>QuizMe</title>
      </head>

      <body
        className={`${popins.variable} antialiased`}
      >
        <header>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
