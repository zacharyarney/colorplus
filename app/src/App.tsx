import React, { useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import './App.css';

interface DropFile extends File {
  preview: string;
}

function App() {
  const [file, setFile] = useState<DropFile[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    // maxFiles: 1,
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
    <img src={file[0].preview} style={{ maxWidth: "800px" }} alt="your image" />
  ) : null;

  return (
    <div className="App">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop or click</p>
      </div>
      <div>{image}</div>
    </div>
  );
}

export default App;
