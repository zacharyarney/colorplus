import quantize from 'quantize';
import getPixels from 'get-pixels';
import ndarray from 'ndarray';

export function createPixelArray(imageUrl: string) {
export function convertImageToPixels(imageUrl: string): Promise<ndarray> {
    imageUrl,
    (err: Error, pixels: ndarray) => {
      if (err) {
        console.log('bad image path', err);
        return err;
      }
// createPixel array takes in ndarray.data, image size, and sampling resolution and returns array of [r, g, b] arrays
export function createPixelArray(
  pixels: ndarray.Data<number>,
  size: number,
  resolution: number
): number[][] {
  const pixelArray = [];

  for (let i = 0; i < size; i += 4 * resolution) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];

    // check for reasonable opacity -- ideally none
    if (a > 127) {
      pixelArray.push([r, g, b]);
    }
  }

      console.log('pixels: ', pixels);
      return pixels;
    }
  );
}
