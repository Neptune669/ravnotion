"use client";

import { Spinner } from "@/components/ui/sppiner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <Spinner size={"lg"} />
      </div>
    );
  }
  if (!isAuthenticated) {
    redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
