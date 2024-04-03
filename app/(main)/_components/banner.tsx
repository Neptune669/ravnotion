"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId }).then(() => {
      router.push("/documents");
    });
    toast.promise(promise, {
      loading: "Deleting Note...",
      success: "Note Deleted",
      error: "Failed to delete",
    });
    router.push("/documents");
  };
  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note Restored",
      error: "Failed to restore",
    });
    router.push("/documents");
  };
  return (
    <div className="w-full bg-rose-500 text-sm text-center p-2 text-white flex items-center gap-x-2 justify-center rounded-sm">
      <p>This page is in the trash</p>
      <Button
        size={"sm"}
        variant="outline"
        className="border-white bg-black hover:bg-black text-white hover:text-white p-1 px-2 h-auto font-normal"
        onClick={onRestore}
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant="outline"
          className="border-white bg-red-600 hover:bg-red-600 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete permanently
        </Button>
      </ConfirmModal>
    </div>
  );
};
