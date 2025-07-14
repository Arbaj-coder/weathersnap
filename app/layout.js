import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WeatherSnap : Plan your day with precision",
  description: "A weather app that shows the current situation.",
  icons: {
    icon: '/favicon.ico',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <div className="min-h-screen  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      {children}
      <Footer/>
       </div>
      </body>
    </html>
  );
}
