import { useEffect, useState } from 'react';
import { generatePalette } from '../util/imageProcessing.ts';

export function useResize(imageUrl: string, paletteSize: number) {
  const [colorPalette, setColorPalette] = useState<string[]>([]);

  useEffect(() => {
    if (imageUrl) {
      // TODO: user should be able to set sampling resolution and palette size
      generatePalette(imageUrl, Number(paletteSize)).then(colors => {
        setColorPalette(colors);
      });
    }
  }, [imageUrl, paletteSize]);

  return { colorPalette };
}
