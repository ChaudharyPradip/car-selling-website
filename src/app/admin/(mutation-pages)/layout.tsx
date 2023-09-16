import AdminNavbar from "@/components/AdminNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AdminNavbar />
            {children}
        </>
    );
}
