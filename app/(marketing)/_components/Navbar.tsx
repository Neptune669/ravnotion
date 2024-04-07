"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/sppiner";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 backdrop-blur  fixed flex items-center top-0 w-full p-6",
        scrolled && "drop-shadow-lg shadow-md rounded-sm border-b"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton afterSignInUrl="/documents" mode="modal">
              <Button variant="ghost" size={"sm"}>
                Sign In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get ravnotion free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size={"sm"} asChild>
              <Link href="/documents">Enter Ravnotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
