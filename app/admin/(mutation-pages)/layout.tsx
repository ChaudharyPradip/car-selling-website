import AdminNavbar from "@/components/AdminNavbar";
import RouteProtector from "@/components/RouteProtector";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <RouteProtector />
            <AdminNavbar />
            {children}
        </>
    );
}
