import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LandPulse",
  description: "LandPulse helps users estimate current land values in the Colombo district's cities and predicts potential growth in the coming years. The app provides actionable insights for investors, professionals, and urban planners by integrating machine learning models and real estate data.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
        </body>
    </html>
  );
}
