import React from "react";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/global/mode-toggle";

type Props = {
  user?: null | User;
};

const Navigation = (props: Props) => {
  return (
    <div className="p-4 flex items-center justify-between relative z-10">
      <aside className="flex items-center gap-2">
        <Image
          src={"./assets/zendo-logo.svg"}
          width={40}
          height={40}
          alt="zendo logo"
        />
        <span className="text-xl font-bold">Zendo</span>
      </aside>
      <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ul className="flex items-center justify-center gap-8">
          <Link href="#">Pricing</Link>
          <Link href="#">About</Link>
          <Link href="#">Documentation</Link>
          <Link href="#">Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80 cursor-pointer"
          href={"/agency"}
        >
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
