import AdminNavbar from "@/components/AdminNavbar";
import DismissableNotice from "@/components/DismissableNotice";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DismissableNotice />
      <AdminNavbar />
      {children}
    </>
  );
}
