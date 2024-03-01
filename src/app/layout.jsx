import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/elements/navbar/Navbar";
import Footer from "./components/elements/footer/Footer";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "LandPulse",
    description:
        "LandPulse helps users estimate current land values in the Colombo district's cities and predicts potential growth in the coming years. The app provides actionable insights for investors, professionals, and urban planners by integrating machine learning models and real estate data.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="light">
            <SessionProvider>
                <body className={inter.className}>
                    <Navbar />
                    {children}
                    <Footer />
                    <Toaster closeButton loadingIcon position="top-right" />
                </body>
            </SessionProvider>
        </html>
    );
}
