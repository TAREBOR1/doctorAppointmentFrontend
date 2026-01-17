
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export const metadata = {
    title: "Doc-ink Doctor Appointment",
    description: "Doc-ink is a website for booking appointment with doctor online, sweet and easy ",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
           
            <Navbar />
            {children}
            <Footer />
        </>
    );
}