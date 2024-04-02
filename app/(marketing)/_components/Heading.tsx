"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Heading = () => {
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
      <Button>
        Get Started <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default Heading;
