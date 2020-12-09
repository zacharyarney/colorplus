import React, { useEffect, useState } from 'react';
import quantize from 'quantize';
import getPixels from 'get-pixels';
import ndarray from 'ndarray';

interface ImageQuantizeProps {
  imageUrl: string;
}

export function ImageQuantize(props: ImageQuantizeProps) {
  const [pixelArr, setPixelArr] = useState<ndarray>(ndarray([]));

  useEffect(() => {
    const imagePixels = getPixels(
      props.imageUrl,
      (err: Error, pixels: ndarray) => {
        if (err) {
          console.log('bad image path');
          return;
        }

        console.log('pixels: ', pixels);
      }
    );

    setPixelArr(imagePixels);
  }, [props.imageUrl, pixelArr]);

  return props.imageUrl.length ? (
    <img src={props.imageUrl} style={{ maxWidth: '800px' }} alt="your image" />
  ) : null;
}
