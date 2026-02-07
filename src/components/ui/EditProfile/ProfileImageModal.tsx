"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageCropper from "./ImageCropper";
import { uploadProfilePicture } from "@/lib/upload-profile-picture";
import { toast } from "sonner";
import { Input } from "../input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (url: string) => void;
}

export default function ProfileImageModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!file) return;
    

    try {
      setLoading(true);
      const url = await uploadProfilePicture(file);
      onSuccess(url);
      toast.success("Profile picture updated");
      handleClose();
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPreview(null);
    setFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg w-full rounded-xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const img = e.target.files?.[0];
              if (!img) return;

              setPreview(URL.createObjectURL(img));
            }}
          />

          {preview && (
            <ImageCropper
              image={preview}
              onComplete={(blob: Blob) => {
                // 🔑 IMPORTANT: Convert Blob → File
                const file = new File([blob], "profile.jpg", {
                  type: blob.type,
                });
                setFile(file);
              }}
            />
          )}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!file || loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
