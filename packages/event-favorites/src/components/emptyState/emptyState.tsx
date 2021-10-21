import { Paragraph, Title } from '../text/text';
import { styled } from 'goober';
import React from 'react';

import { Heart } from 'react-feather';
import { RedButtonLink } from '../button/button';
import { useConfig } from '../../context/config-context';

const EmptyStateContainer = styled('div')`
  background: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const EmptyStateContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  padding: 48px;
`;

export function EmptyState() {
  const { activityPageUrl } = useConfig();
  return (
    <EmptyStateContainer>
      <EmptyStateContentWrapper>
        <Heart fill="#EC0000" stroke="#EC0000" width="64" height="64" />
        <Title>Geen favorieten activiteiten</Title>
        <Paragraph>
          Je kan activiteiten waar je graag aan wilt deelnemen hier verzamelen
          door op het hartje te klikken
        </Paragraph>

        <RedButtonLink href={activityPageUrl}>
          Alle activiteiten bekijken
        </RedButtonLink>
      </EmptyStateContentWrapper>
    </EmptyStateContainer>
  );
}
