"use client";

import Cropper from "react-easy-crop";
import { useState } from "react";

interface Props {
  image: string;
  onComplete: (file: File) => void;
}

export default function ImageCropper({ image, onComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleComplete = async (_: any, croppedAreaPixels: any) => {
    const file = await cropImage(image, croppedAreaPixels);
    onComplete(file);
  };

  return (
    <div className="relative h-[320px] w-full bg-black rounded-md">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleComplete}
      />
    </div>
  );
}

async function cropImage(src: string, crop: any): Promise<File> {
  const img = new Image();
  img.src = src;
  await new Promise((resolve) => (img.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob!], "profile.jpg", { type: "image/jpeg" }));
    }, "image/jpeg");
  });
}
