import { Paragraph } from '../text/text';
import { styled } from 'goober';
import React from 'react';

const EmptyStateContainer = styled('div')`
  text-align: center;
  margin-top: 48px;
  width: 100%;
  grid-column-start: 2;
`;

export function EmptyState() {
  return (
    <EmptyStateContainer>
      <Paragraph>Geen activiteiten geselecteerd</Paragraph>
    </EmptyStateContainer>
  );
}
