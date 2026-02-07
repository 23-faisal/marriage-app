"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import SinglePhoto from "./SinglePhoto";
import { fetchGallery, deleteGalleryImage } from "@/lib/gallery-api";

export interface GalleryPhoto {
  id: number;
  path: string;
}

interface Props {
  // Optional callback to trigger gallery reload
  reloadTrigger?: number;
}

export default function ShowGalleryImage({ reloadTrigger }: Props) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load gallery images
  const loadGallery = async () => {
    try {
      const data = await fetchGallery();
      setPhotos(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load gallery");
    }
  };

  // Load on mount and whenever reloadTrigger changes
  useEffect(() => {
    loadGallery();
  }, [reloadTrigger]);

  // Delete image
  const handleDelete = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      await deleteGalleryImage(selected.id);

      toast.success("Image deleted successfully");

      // Remove deleted image from state
      setPhotos((prev) => prev.filter((p) => p.id !== selected.id));

      setConfirmOpen(false);
      setSelected(null);
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {photos.map((photo) => (
          <SinglePhoto
            key={photo.id}
            photo={photo}
            onClick={() => setSelected(photo)}
          />
        ))}
      </div>

      {!photos.length && (
        <p className="text-center text-muted-foreground mt-10">
          No images found
        </p>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>

          {selected && (
            <img
              src={selected.path}
              className="w-full h-auto  object-cover rounded-lg"
              alt="gallery image"
            />
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
              Delete
            </Button>

            <Button variant="outline" onClick={() => setSelected(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            This image will be permanently deleted.
          </p>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={loading}
              onClick={handleDelete}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
