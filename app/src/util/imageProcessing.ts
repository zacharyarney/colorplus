import {
  executeAndReturnOutputFile,
  buildInputFile,
  getPixelColor,
  extractInfo,
} from 'wasm-imagemagick';
// import quantize from 'quantize';
import getPixels from 'get-pixels';
import ndarray from 'ndarray';
import { ExtractInfoResultImage } from 'wasm-imagemagick/dist/src/util/imageExtractInfoTypes';

interface CustomExtractInfoResult extends ExtractInfoResultImage {
  colormap: string[];
}

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

export async function generatePalette(imageUrl: string, paletteSize: number) {
  // const colorObj: { [key: string]: boolean } = {};
  // const factor = Math.sqrt(paletteSize);
  const inputImage = await buildInputFile(imageUrl);
  const outputFile = await executeAndReturnOutputFile({
    inputFiles: [inputImage],
    commands: [
      `${inputImage.name} -resize 250 -quality 1 -density 32 -colors 16 ${inputImage.name}.gif`,
      // `${inputImage.name} -sample ${factor} -format gif ${inputImage.name}_sample.gif`,
    ],
  });

  if (outputFile) {
    const outputFileInfo = await extractInfo(outputFile);
    return outputFileInfo[0].image ? (outputFileInfo[0].image as CustomExtractInfoResult).colormap : [];
    // return outputFileInfo[0].image ? outputFileInfo[0].image.colormap : [];
    // const outputFileHeight = outputFileInfo[0].image
    //   ? outputFileInfo[0].image.geometry.height
    //   : 0;
    // const outputFileWidth = outputFileInfo[0].image
    //   ? outputFileInfo[0].image.geometry.width
    //   : 0;
    // for (let i = 0; i < outputFileHeight; i++) {
    //   for (let ii = 0; ii < outputFileWidth; ii++) {
    //     const x = i;
    //     const y = ii;
    //     const color = await getPixelColor(inputImage, x, y);
    //     // colorArray.push(color);
    //     colorObj[color] = true;
    //   }
    // }
  }

  return [];

  // const imageNdarray = await convertImageToPixels(imageUrl);
  // const imageData = imageNdarray.data;
  // const size = imageNdarray.shape[0] * imageNdarray.shape[1];
  // const pixelArray = createPixelArray(imageData, size, resolution);

  // TODO: add logic to increase diversity of the palette
  // return quantize(pixelArray, paletteSize).palette();
}
