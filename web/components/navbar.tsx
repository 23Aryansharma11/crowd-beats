"use client";

import Link from "next/link";

import { Button } from "./ui/button";

import { ModeToggle } from "./mode-toggle";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const { data: session } = authClient.useSession();

  return (
    <header className="h-20 flex justify-center items-center border-b fixed top-0 w-full bg-background">
      <div className="w-full md:container md:mx-auto px-4 flex items-center justify-center">
        <Link href={"/"} className="font-gugi font-bold text-base md:text-xl">
          Crowd Beats
        </Link>
        <div className="ml-auto flex justify-center items-center">
          {!session && <Button className="rounded-full">Get Started</Button>}
          <ModeToggle className="hidden md:inline" />
        </div>
      </div>
    </header>
  );
}
