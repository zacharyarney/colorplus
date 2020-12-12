import quantize from 'quantize';
import getPixels from 'get-pixels';
import ndarray from 'ndarray';

// convertImageToPixels takes in an image URL and returns a 2D ndarray of pixels with RGBA values
export function convertImageToPixels(imageUrl: string): Promise<ndarray> {
  return new Promise<ndarray>((resolve, reject) => {
    getPixels(imageUrl, (err: Error, pixels: ndarray) => {
      if (err) {
        console.log('bad image path', err);
        reject(err);
      }

      resolve(pixels);
    });
  });
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

  return pixelArray;
}

export async function generatePalette(imageUrl: string, resolution: number, paletteSize: number) {
  const imageNdarray = await convertImageToPixels(imageUrl);

  const imageData = imageNdarray.data;
  const size = imageNdarray.shape[0] * imageNdarray.shape[1];
  const pixelArray = createPixelArray(imageData, size, resolution);

  // TODO: add logic to increase diversity of the palette
  return quantize(pixelArray, paletteSize).palette();
}
