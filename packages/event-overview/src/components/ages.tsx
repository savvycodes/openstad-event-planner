import React from 'react';

export function Ages({ minAge, maxAge, ...props }: any) {
  if (maxAge === 99) {
    return <p {...props}>{minAge} jaar en ouder</p>;
  }

  return (
    <p {...props}>
      {minAge}-{maxAge} jaar
    </p>
  );
}
