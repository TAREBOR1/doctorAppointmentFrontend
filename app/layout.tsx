
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/lenisScroll"
import ScrollToTop from "@/components/scrollToTop"
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});
export const metadata = {
    title: "Doc-ink Doctor Appointment",
    description: "Doc-ink is a website for booking appointment with doctor online, sweet and easy ",
};

export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* <head>
                <link rel="preload" href="/assets/background-splash.svg" as="image" />
            </head> */}
            <body className={`${poppins.variable}`}>
                <LenisScroll />
                <ScrollToTop/>
                 <Toaster/>
                <Providers>
                  <Navbar/>
                 {children}
                 <Footer/>
                </Providers>
                  
              
            </body>
        </html>
    );
}
