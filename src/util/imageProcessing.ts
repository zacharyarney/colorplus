'use server';
import { ColorPalette } from 'clancy';

export async function generatePalette(imageUrl: string, paletteSize: number) {
  const colorPalette = new ColorPalette(imageUrl);
  await colorPalette.loadHistogram(3, paletteSize);
  return colorPalette.histogram.map(pixel => {
    return `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
  });
}
