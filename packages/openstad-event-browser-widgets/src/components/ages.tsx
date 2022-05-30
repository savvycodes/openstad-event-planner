import React from 'react';

export function formatAges(minAge: any, maxAge: any) {
  if (maxAge === 99) {
    return `${minAge} jaar en ouder`;
  }

  return `${minAge}-${maxAge} jaar`;
}

export function Ages({ minAge, maxAge, ...props }: any) {
  return <p {...props}>{formatAges(minAge, maxAge)}</p>;
}
