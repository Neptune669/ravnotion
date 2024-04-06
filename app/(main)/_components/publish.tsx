"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublishProps {
  initialData: Doc<"documents">;
}
export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = async () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);

      toast.promise(promise, {
        loading: "Publishing...",
        success: "Published!",
        error: "Failed to publish",
      });
    });
  };
  const onUnPublish = async () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);

      toast.promise(promise, {
        loading: "UnPublishing...",
        success: "UnPublished!",
        error: "Failed to UnPublish note",
      });
    });
  };
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size={"sm"} disabled={isSubmitting}>
          Published
          {initialData.isPublished && (
            <Globe className="w-4 h-4 ml-2 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4 ">
            <div className="flex items-center gap-x-2">
              <Globe className="w-4 h-4 animate-pulse text-sky-500" />
              <p className="text-xs text-sky-500 font-medium">
                this note is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                disabled
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
                size={"sm"}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4 " />
                )}
              </Button>
            </div>
            <Button
              onClick={onUnPublish}
              className="w-full text-xs"
              disabled={isSubmitting}
            >
              UnPublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-sm text-muted-foreground mb-4">
              share your note with the world
            </span>
            <Button
              onClick={onPublish}
              disabled={isSubmitting}
              className="w-full text-sm"
              size={"sm"}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
