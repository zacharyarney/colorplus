import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageQuantize } from '../ImageQuantize/ImageQuantize';

interface DropFile extends File {
  url: string;
}

export function ImageDrop() {
  const [file, setFile] = useState<DropFile[]>([]);

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

  const imageUrl = file.length ? file[0].url : '';

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop or click</p>
      </div>
      <ImageQuantize imageUrl={imageUrl} />
    </div>
  );
}
