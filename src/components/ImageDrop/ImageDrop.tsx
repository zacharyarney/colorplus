import { useState, ChangeEventHandler, ChangeEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageQuantize } from '../ImageQuantize/ImageQuantize';

interface DropFile extends File {
  url: string;
}

export function ImageDrop() {
  const [file, setFile] = useState<DropFile[]>([]);
  const [paletteSize, setPaletteSize] = useState(10);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      const dropFile: DropFile[] = acceptedFiles.map(file =>
        Object.assign(acceptedFiles[0], {
          url: URL.createObjectURL(file),
        })
      );
      setFile(dropFile);
    },
  });

  const handleSelectPaletteSize: ChangeEventHandler<HTMLSelectElement> = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setPaletteSize(Number(event.target.value));
  };

  const imageUrl = file.length ? file[0].url : '';

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop or click</p>
      </div>
      <select
        name="paletteSizeSelect"
        value={paletteSize}
        onChange={handleSelectPaletteSize}
      >
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="16">16</option>
      </select>
      <ImageQuantize imageUrl={imageUrl} paletteSize={paletteSize} />
    </div>
  );
}
