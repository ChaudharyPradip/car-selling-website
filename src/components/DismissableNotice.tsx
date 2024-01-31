"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const DismissableNotice = ({
  clientPage = false,
}: {
  clientPage?: boolean;
}) => {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Check if the user has dismissed the notice before
    if (localStorage.getItem("noticeDismissed") === null) {
      setShowNotice(true);
    }
  }, []);

  const dismissNotice = () => {
    setShowNotice(false);

    // Set a flag in local storage to indicate that the notice has been dismissed
    localStorage.setItem("noticeDismissed", "true");
  };

  return (
    showNotice && (
      <div className="bg-yellow-200 py-2 px-4 pr-12 text-center relative w-full">
        <p className="text-sm">
          This site was created for a client which is no longer in use.{" "}
          <Link
            href={clientPage ? "/admin" : "/"}
            className="underline"
            rel="noopener noreferrer"
          >
            {clientPage
              ? "Click here to access the admin dashboard"
              : "Click here to checkout the customer facing site"}
          </Link>
        </p>
        <Image
          onClick={dismissNotice}
          className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
          src="/x-solid.svg"
          width={15}
          height={15}
          alt="close icon"
        />
      </div>
    )
  );
};

export default DismissableNotice;
