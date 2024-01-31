import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-center py-5">
      <Link href="/">
        <Image src="/logo.png" width={300} height={120} alt="logo" />
      </Link>
    </div>
  );
};

export default Navbar;
