import React, { useEffect, useState } from 'react';
import ndarray from 'ndarray';
import { createPixelArray } from '../../util/imageProcessing';

interface ImageQuantizeProps {
  imageUrl: string;
}

export function ImageQuantize(props: ImageQuantizeProps) {
  const [pixelArr, setPixelArr] = useState<ndarray>(ndarray([]));

  useEffect(() => {
    if (props.imageUrl) {
      const imagePixels = createPixelArray(props.imageUrl);
      setPixelArr(imagePixels);
    }
  }, [props.imageUrl]);

  return props.imageUrl.length ? (
    <img src={props.imageUrl} style={{ maxWidth: '800px' }} alt="your image" />
  ) : null;
}
