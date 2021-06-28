import React from 'react';
import { Paragraph } from './text/text';

export function formatAges(minAge: any, maxAge: any) {
  if (maxAge === 99) {
    return `${minAge} jaar en ouder`;
  }

  return `${minAge}-${maxAge} jaar`;
}

export function Ages({ minAge, maxAge, ...props }: any) {
  return <Paragraph {...props}>{formatAges(minAge, maxAge)}</Paragraph>;
}
