import { useResize } from '../../hooks/useResize.ts';

interface ImageQuantizeProps {
  imageUrl: string;
  paletteSize: number;
}

export function ImageQuantize(props: ImageQuantizeProps) {
  const { colorPalette } = useResize(props.imageUrl, props.paletteSize);

  const image = props.imageUrl.length ? (
    <img src={props.imageUrl} style={{ maxWidth: '400px' }} alt="upload" />
  ) : null;

  const colors = colorPalette.map((color, index) => {
    return (
      <div
        style={{ height: '100px', width: '100px', background: color }}
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
