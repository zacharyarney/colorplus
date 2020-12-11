import React, { useEffect, useState } from 'react';
import { generatePalette } from '../../util/imageProcessing';

interface ImageQuantizeProps {
  imageUrl: string;
}

export function ImageQuantize(props: ImageQuantizeProps) {
  const [colorPalette, setColorPalette] = useState<number[][]>([]);

  useEffect(() => {
    if (props.imageUrl) {
      generatePalette(props.imageUrl, 10, 60).then(palette => {
        setColorPalette(palette);
      });
    }
  }, [props.imageUrl]);

  return props.imageUrl.length ? (
    <img src={props.imageUrl} style={{ maxWidth: '800px' }} alt="your image" />
  ) : null;
}
