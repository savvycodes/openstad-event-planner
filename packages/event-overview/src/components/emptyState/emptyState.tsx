import { Paragraph } from '../text/text';
import { styled } from 'goober';
import React from 'react';

const EmptyStateContainer = styled('div')`
  text-align: center;
  margin-top: 24px;
  width: 100%;
`;

export function EmptyState() {
  return (
    <EmptyStateContainer>
      <Paragraph>Geen resultaten</Paragraph>
    </EmptyStateContainer>
  );
}
