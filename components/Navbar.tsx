import Image from "next/image";

const Navbar = () => {
    return (
        <div className="flex justify-center py-5">
            <Image src="/logo.png" width={300} height={120} alt="logo" />
        </div>
    );
};

export default Navbar;
