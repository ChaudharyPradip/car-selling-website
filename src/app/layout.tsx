import "./globals.css";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import ToastNotification from "@/components/ToastNotification";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
    title: "Chamunda Auto Consultant",
    description: "Online Car selling website"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="wrapper">
                <ToastNotification />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
