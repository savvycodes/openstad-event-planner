import React from 'react';

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
}

/**
 * Basic image resize component that works with image-steam
 * @returns
 */
export function Image({ src, width, height, alt }: ImageProps) {
  let resizedSource = src + '/:/rs=';
  let sizes = [];

  if (width) {
    sizes.push('w:' + width);
  }

  if (height) {
    sizes.push('h:' + height);
  }

  resizedSource = resizedSource + sizes.join(',');

  if (width || height) {
    return <img src={resizedSource} alt={alt} />;
  }

  return <img src={src} alt={alt} />;
}
