import React, { useEffect, useState, InputHTMLAttributes } from 'react';

import { Spinner } from '../spinner';
import { ErrorBanner } from '../error-banner';
import { useConfig } from '../../context/config-context';

type ImageUploadProps = {
  onUpload: (data: ImageResponse) => void;
} & InputHTMLAttributes<HTMLInputElement>;

type ImageResponse = {
  url: string;
};

export function ImageUpload({ onUpload, value, ...props }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<Error | null>(null);
  const config = useConfig();

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      setUploading(true);

      fetch(config.imageUrl, {
        method: 'POST',
        body: formData,
      })
        .then(res => {
          if (res.status >= 400) {
            throw Error(`Could not upload image: (HTTP: ${res.status})`);
          }
          return res;
        })
        .then(res => res.json())
        .then((data: ImageResponse) => {
          onUpload(data);
        })
        .catch(err => {
          setUploadError(err);
          console.error('could not upload image', err);
        })
        .finally(() => setUploading(false));
    }
  }, [file, config.imageUrl, onUpload]);

  return (
    <>
      {uploadError ? (
        <ErrorBanner>
          Oeps, we konden de afbeelding niet uploaden ({uploadError.message})
        </ErrorBanner>
      ) : null}
      {uploading ? <Spinner /> : null}
      {file ? <img src={URL.createObjectURL(file)} alt="" /> : null}
      {!file && value ? <img src={value.toString()} alt="" /> : null}
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={e => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        {...props}
      />
    </>
  );
}
