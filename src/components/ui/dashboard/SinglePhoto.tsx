"use client";

interface GalleryPhoto {
  id: number;
  path: string;
}

interface Props {
  photo: GalleryPhoto;
  onClick: () => void;
}

export default function SinglePhoto({ photo, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-lg border hover:opacity-80"
    >
      <img
        src={`${photo.path}`}
        className="h-40 w-full object-contain "
        alt=""
      />
    </div>
  );
}
