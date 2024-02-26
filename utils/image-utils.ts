import { createApi } from "unsplash-js";
import { Photo } from "../types";
import lqip from "lqip-modern";

async function getDataUrl(url: string) {
  const imgData = await fetch(url);

  const arrayBufferData = await imgData.arrayBuffer();
  const lqipData = await lqip(Buffer.from(arrayBufferData));

  return lqipData.metadata.dataURIBase64;
}

export async function getImages(
  cli: ReturnType<typeof createApi>,
  query: string
): Promise<Photo[]> {
  const mappedPhotos: Photo[] = [];

  const photos = await cli.search.getPhotos({
    query,
  });

  if (photos.type === "success") {
    const photosArr = photos.response.results.map((photos, idx) => ({
      src: photos.urls.regular,
      thumb: photos.urls.thumb,
      width: photos.width,
      height: photos.height,
      alt: photos.alt_description ?? `img-${idx}`,
    }));

    const photosArrWithDataUrl: Photo[] = [];

    for (const photo of photosArr) {
      const blurDataURL = await getDataUrl(photo.src);
      photosArrWithDataUrl.push({ ...photo, blurDataURL });
    }

    mappedPhotos.push(...photosArrWithDataUrl);
  } else {
    console.error("could not get the photos");
  }

  return mappedPhotos;
}
