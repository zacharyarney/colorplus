import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropFile extends File {
  preview: string;
}

function ImageDrop() {
  const [file, setFile] = useState<DropFile[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      console.log(file);
      const dropFile: DropFile[] = acceptedFiles.map(file =>
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(file),
        })
      );
      setFile(dropFile);
    },
  });

  const image = file.length ? (
    <img src={file[0].preview} style={{ maxWidth: '800px' }} alt="your image" />
  ) : null;

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop or click</p>
      </div>
      <div>{image}</div>
    </div>
  );
}

export default ImageDrop;
