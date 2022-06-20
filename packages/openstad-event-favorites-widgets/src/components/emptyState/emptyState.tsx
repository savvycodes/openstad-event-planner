import { styled } from 'goober';
import React from 'react';

import { Heart } from 'react-feather';
import { useConfig } from '../../context/config-context';

const EmptyStateContainer = styled('div')`
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
  padding: 48px;
`;

export function EmptyState() {
  const { activityPageUrl } = useConfig();
  return (
    <EmptyStateContainer className="empty-state-container">
      <EmptyStateContentWrapper className="empty-state-content-wrapper">
        <Heart fill="#EC0000" stroke="#EC0000" width="64" height="64" />
        <h3>Geen favorieten activiteiten</h3>
        <p>
          Je kan activiteiten waar je graag aan wilt deelnemen hier verzamelen
          door op het hartje te klikken
        </p>

        <a href={activityPageUrl}>
          <button>
            Alle activiteiten bekijken
          </button>
        </a>
      </EmptyStateContentWrapper>
    </EmptyStateContainer>
  );
}
