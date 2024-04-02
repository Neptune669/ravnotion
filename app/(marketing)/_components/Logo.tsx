import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const Logo = () => {
  return (
    <div className="hidden  md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        className="dark:hidden"
        alt="logo"
        width={40}
        height={40}
      />
      <Image
        src="/logo-dark.svg"
        className="hidden dark:block"
        alt="logo"
        width={40}
        height={40}
      />
      <p className={cn("font-semibold", font.className)}>Ravnotion</p>
    </div>
  );
};
