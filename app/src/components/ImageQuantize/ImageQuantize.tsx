import React, { useEffect, useState } from 'react';
import ndarray from 'ndarray';

interface ImageQuantizeProps {
  imageUrl: string;
}

export function ImageQuantize(props: ImageQuantizeProps) {
  const [pixelArr, setPixelArr] = useState<ndarray>(ndarray([]));

  useEffect(() => {

    setPixelArr(imagePixels);
  }, [props.imageUrl, pixelArr]);

  return props.imageUrl.length ? (
    <img src={props.imageUrl} style={{ maxWidth: '800px' }} alt="your image" />
  ) : null;
}
