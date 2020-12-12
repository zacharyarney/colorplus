import React, { useEffect, useState } from 'react';
import { generatePalette } from '../../util/imageProcessing';

interface ImageQuantizeProps {
  imageUrl: string;
}

export function ImageQuantize(props: ImageQuantizeProps) {
  const [colorPalette, setColorPalette] = useState<number[][]>([]);

  useEffect(() => {
    if (props.imageUrl) {
      // TODO: user should be able to set sampling resolution and palette size
      generatePalette(props.imageUrl, 1, 6).then(palette => {
        setColorPalette(palette);
      });
    }
  }, [props.imageUrl]);

  const image = props.imageUrl.length ? (
    <img src={props.imageUrl} style={{ maxWidth: '400px' }} alt="your image" />
  ) : null;

  const colors = colorPalette.map((color, index) => {
    return (
      <div
        style={{ height: '100px', width: '100px', background: `rgb(${color})` }}
        key={index}
      ></div>
    );
  });

  return (
    <>
      {image}
      <div style={{ display: 'flex', flexDirection: 'row' }}>{colors}</div>
    </>
  );
}
