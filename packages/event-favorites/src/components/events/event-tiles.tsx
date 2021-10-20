import { styled } from 'goober';
import React from 'react';

import {
  ActivityCard,
  ActivityImageWrapper,
  ActivityImage,
  CardTextContainer,
  IconWrapper,
  TrashIcon,
  IconContainer,
  HeartIcon,
} from '../card/card';
import { BorderedCardTitle } from '../text/text';

const styles = {
  SmallParagraph: styled('p')`
    display: block;
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: bold;
    line-height: 14px;
  `,
  Description: styled('p')`
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  Paragraph: styled('p')`
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: red;
  `,
};

const LoadEvents = (events: any, add: any) => {
  return events.map((event: any) => (
    <ActivityCard>
      <IconWrapper>
        {add ? (
          <IconContainer>
            <HeartIcon active={false} />
          </IconContainer>
        ) : (
          <IconContainer>
            <TrashIcon />
          </IconContainer>
        )}
      </IconWrapper>
      <ActivityImageWrapper>
        <ActivityImage
          src={event.image + '/:/rs=w:666'}
          alt={event.name}
          loading="lazy"
        />
      </ActivityImageWrapper>
      <CardTextContainer>
        <BorderedCardTitle title={event.name} />
        <styles.SmallParagraph>
          Door: {event.organisation.name}
        </styles.SmallParagraph>
        <styles.Description>
          {event.description.replace(/(<([^>]+)>)/gi, '')}
        </styles.Description>
        <styles.Paragraph onClick={() => console.log('nice')}>
          Activiteit bekijken
        </styles.Paragraph>
      </CardTextContainer>
    </ActivityCard>
  ));
};

// export function EventTiles({ events }: any) {
//   return events && events.length > 0 ? LoadEvents(events) : <EmptyState />;
// }

export function EventTiles({ events, add }: any) {
  return LoadEvents(events, add);
}
