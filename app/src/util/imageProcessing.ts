import quantize from 'quantize';
import getPixels from 'get-pixels';
import ndarray from 'ndarray';

export function createPixelArray(imageUrl: string) {
  return getPixels(
    imageUrl,
    (err: Error, pixels: ndarray) => {
      if (err) {
        console.log('bad image path', err);
        return err;
      }

      console.log('pixels: ', pixels);
      return pixels;
    }
  );
}
