
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/lenisScroll"
import ScrollToTop from "@/components/scrollToTop"
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

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
           
                   {children}
              
            </body>
        </html>
    );
}
