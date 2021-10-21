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
import { useConfig } from '../../context/config-context';

const styles = {
  SmallParagraph: styled('p')`
    display: block;
    margin-top: 8px;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: bold;
    line-height: 14px;
  `,
  Description: styled('p')`
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.8;
  `,
  Link: styled('a')`
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: red;
  `,
};

export function EventTiles({ events, add, onDelete, onFavorite }: any) {
  const { activityPageUrl } = useConfig();

  return events.map((event: any) => (
    <ActivityCard key={event.id}>
      <IconWrapper>
        {add ? (
          <IconContainer>
            <HeartIcon
              active={false}
              onClick={() => onFavorite && onFavorite(event.id)}
            />
          </IconContainer>
        ) : (
          <IconContainer>
            <TrashIcon onClick={() => onDelete && onDelete(event.id)} />
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
        {event.organisation ? (
          <styles.SmallParagraph>
            Door: {event.organisation?.name}
          </styles.SmallParagraph>
        ) : null}
        <styles.Description>{event.description}</styles.Description>
        <styles.Link href={`${activityPageUrl}/events/${event.id}`}>
          Activiteit bekijken
        </styles.Link>
      </CardTextContainer>
    </ActivityCard>
  ));
}
