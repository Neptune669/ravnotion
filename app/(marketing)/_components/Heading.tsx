"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/sppiner";
import { SignInButton } from "@clerk/clerk-react";
import { useConvex, useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas ,Documents, &Plans. Unified. Welcome to{" "}
        <span className="underline">Ravnotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Ravnotion is a new way to document and organize ideas. <br />
        where Better ,Faster Work happens
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center ">
          <Spinner size={"lg"} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Link className={buttonVariants()} href="/documents">
          Enter Ravnotion <ArrowRight className="size-4 ml-2" />
        </Link>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button size={"sm"}>
            Get ravnotion free <ArrowRight className="size-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
