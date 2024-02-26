import type { Photo } from "../types";
import type { LightGallery } from "lightgallery/lightgallery";
import { useRef } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import LightGalleryComponent from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

type GalleryProps = {
  photos: Photo[];
};

export function Gallery({ photos }: GalleryProps) {
  const lightboxRef = useRef<LightGallery | null>(null);

  return (
    <>
      <Masonry breakpointCols={{default: 2, 800: 1}} className="flex gap-2" columnClassName="">
        {photos.map((photo, idx) => (
          <div className="relative" key={photo.src}>
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              className="relative mb-2"
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
            />
            <div
              className="absolute w-full h-full inset-0 bg-transparent hover:bg-dark hover:bg-opacity-10 cursor-pointer"
              onClick={() => {
                lightboxRef.current?.openGallery(idx);
              }}
            ></div>
          </div>
        ))}
      </Masonry>
      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightboxRef.current = ref.instance;
          }
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((photo) => ({
          src: photo.src,
          thumb: photo.src,
        }))}
      />
    </>
  );
}
