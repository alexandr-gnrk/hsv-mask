import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HSV Mask",
  description: "App that will help you to create a HSV mask for images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://docs.opencv.org/4.10.0/opencv.js" async></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
