import {
  executeAndReturnOutputFile,
  buildInputFile,
  extractInfo,
} from 'wasm-imagemagick';
import { ExtractInfoResultImage } from 'wasm-imagemagick/dist/src/util/imageExtractInfoTypes';

interface CustomExtractInfoResult extends ExtractInfoResultImage {
  colormap: string[];
}

export async function generatePalette(imageUrl: string, paletteSize: number) {
  // const colorObj: { [key: string]: boolean } = {};
  // const factor = Math.sqrt(paletteSize);
  const density = paletteSize * 2;
  const inputImage = await buildInputFile(imageUrl);
  const outputFile = await executeAndReturnOutputFile({
    inputFiles: [inputImage],
    commands: [
      `${inputImage.name} -resize 250 -quality 1 -density ${density} -colors ${paletteSize} ${inputImage.name}.gif`,
      // `${inputImage.name} -sample ${factor} -format gif ${inputImage.name}_sample.gif`,
    ],
  });

  if (outputFile) {
    const outputFileInfo = await extractInfo(outputFile);
    const colormap = outputFileInfo[0].image
      ? (outputFileInfo[0].image as CustomExtractInfoResult).colormap
      : [];

    return colormap.length ? colormap.slice(0, paletteSize) : [];
    // const outputFileHeight = outputFileInfo[0].image
    //   ? outputFileInfo[0].image.geometry.height
    //   : 0;
    // const outputFileWidth = outputFileInfo[0].image
    //   ? outputFileInfo[0].image.geometry.width
    //   : 0;
    //
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
}
