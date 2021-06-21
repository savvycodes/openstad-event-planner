import React from 'react';
import { SmallParagraph } from './text/text';

export function Ages({ minAge, maxAge, ...props }: any) {
  if (maxAge === 99) {
    return <SmallParagraph {...props}>{minAge} jaar en ouder</SmallParagraph>;
  }

  return (
    <SmallParagraph {...props}>
      {minAge}-{maxAge} jaar
    </SmallParagraph>
  );
}
