"use client";

import GalleryImageUpload from "@/components/ui/dashboard/GalleryImageUpload";
import ShowGalleryImage from "@/components/ui/dashboard/ShowGalleryImage";
import { useState } from "react";

export default function PhotoGallery() {
  const [reload, setReload] = useState(0); // simple reload trigger

  return (
    <div className="px-4">
      <div className="my-4 flex justify-end">
        <GalleryImageUpload onUploaded={() => setReload((r) => r + 1)} />
      </div>

      <ShowGalleryImage reloadTrigger={reload} />
    </div>
  );
}
