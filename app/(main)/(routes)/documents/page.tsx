"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = async () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note",
      success: "New note created",
      error: "Failed to create a new note",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/empty.png"}
        className="dark:hidden "
        width={300}
        height={300}
        alt={"empty"}
      />
      <Image
        src={"/empty-dark.png"}
        className="hidden dark:block"
        width={300}
        height={300}
        alt={"empty"}
      />
      <h2 className="text-lg font-medium">{`Welcome to ${user?.firstName}'s Documents`}</h2>
      <Button onClick={onCreate}>
        <PlusCircle className="size-4 mr-2" />
        Create New Note
      </Button>
    </div>
  );
};

export default DocumentsPage;
