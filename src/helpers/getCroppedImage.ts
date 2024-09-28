import { Area } from 'react-easy-crop';

export default async function getCroppedImage(imageSrc: string, crop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const { width, height } = crop;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    width,
    height,
    0,
    0,
    width,
    height
  );

  return new Promise<string | null>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      } else {
        reject(new Error('Canvas is empty'));
      }
    }, 'image/jpeg');
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}
