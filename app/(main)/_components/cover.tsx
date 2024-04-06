"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

interface CoverProps {
  url?: string;
  preview?: boolean;
}
export const Cover = ({ url, preview }: CoverProps) => {
  const coverImage = useCoverImage();
  const params = useParams();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemoveCoverImage = () => {
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill className="object-cover " alt="cover" />}
      {url && !preview && (
        <div className="opacity-0 flex items-center gap-x-2 group-hover:opacity-100 absolute bottom-5 right-5  ">
          <Button
            onClick={coverImage.onOpen}
            variant="outline"
            size={"sm"}
            className="text-muted-foreground text-xs "
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change Cover
          </Button>
          <Button
            onClick={onRemoveCoverImage}
            variant="outline"
            size={"sm"}
            className="text-muted-foreground text-xs "
          >
            <X className="mr-2 h-4 w-4" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};
