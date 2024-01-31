import Navbar from "@/components/Navbar";
import DismissableNotice from "@/components/DismissableNotice";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DismissableNotice clientPage={true} />
      <Navbar />
      {children}
    </>
  );
}
