import React from 'react';
import { Paragraph } from './text/text';

export function Ages({ minAge, maxAge, ...props }: any) {
  if (maxAge === 99) {
    return <Paragraph {...props}>{minAge} jaar en ouder</Paragraph>;
  }

  return (
    <Paragraph {...props}>
      {minAge}-{maxAge} jaar
    </Paragraph>
  );
}
