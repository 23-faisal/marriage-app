"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadGalleryImages } from "@/lib/upload-photo-in-gallery";
import { toast } from "sonner";

interface Props {
  onUploaded?: () => void; // callback to reload gallery
}

export default function GalleryImageUpload({ onUploaded }: Props) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 4) {
      toast.error("Max 4 images allowed");
      e.target.value = "";
      return;
    }
    setFiles(selected);
  };

  const handleUpload = async () => {
    if (!files.length) return;

    try {
      setUploading(true);
      await uploadGalleryImages(files);
      toast.success("Images uploaded successfully");

      setFiles([]);
      setOpen(false);

      // Trigger gallery reload
      onUploaded?.();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload Gallery Images</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Images (Max 4)</DialogTitle>
        </DialogHeader>

        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button disabled={uploading || !files.length} onClick={handleUpload}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
