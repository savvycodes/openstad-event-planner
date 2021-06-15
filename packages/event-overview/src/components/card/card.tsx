import { styled } from 'goober';
import React, { MouseEventHandler } from 'react';
import { Edit3, Trash2 } from 'react-feather';
import { BorderedCardTitle } from '../text/text';

/**
 * Card helpers
 */
type CardProps = {
  newactivity?: boolean;
};

export const CardWrapper = styled('div')`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ActivityCard = styled('div')<CardProps>`
  cursor: pointer;
  /* width: ${100 / 3}%; */
  height: 42.5vh;
  background-color: ${props =>
    props.newactivity
      ? props.theme.colors.background
      : props.theme.colors.white};
  box-shadow: ${props => props.theme.effects.boxShadowPrimary};
  margin: 12px;
  position: relative;
`;
export const CardTextContainer = styled('div')`
  margin: -5% 5%;
  width: 80%;
`;
export const CardIconContainer = styled('div')`
  position: absolute;
  width: 90%;
  right: 5%;
  bottom: 5%;
  justify-content: center;
`;

export const CardTagsContainer = styled('div')`
  position: absolute;
  bottom: 12px;
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const CardTag = styled('p')`
  font-size: 8px;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  padding: 0 8px;
  margin: 0 4px;
`;

export const NewActivityCardTextContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActivityImage = styled('img')`
  width: 90%;
  height: 60%;
  margin: 5%;
  object-fit: cover;
`;

export const AddActivityButton = styled('button')`
  @media (max-width: 1023px) {
    cursor: pointer;
    border: none;
    align-items: center;
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.effects.boxShadowPrimary};
    padding: 0 4px;
  }
  @media (min-width: 1024px) {
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.effects.boxShadowPrimary};
    position: absolute;
    right: 0;
    padding: 4px 12px;
  }
`;

type ActivityCardsProps = {
  src: string;
  title: string;
  onDelete?: MouseEventHandler;
  onEdit?: MouseEventHandler;
};

export function ActivityCards({
  src,
  title,
  onDelete = () => null,
  onEdit = () => null,
}: ActivityCardsProps) {
  return (
    <ActivityCard newactivity>
      <ActivityImage src={src} />
      <CardTextContainer>
        <BorderedCardTitle title={title} />
      </CardTextContainer>
      <CardIconContainer>
        <Trash2
          style={{ float: 'right', padding: '0 4px' }}
          size={18}
          stroke={'#7a7a7a'}
          onClick={onDelete}
        />
        <Edit3
          style={{ float: 'right' }}
          stroke={'#7a7a7a'}
          size={18}
          onClick={onEdit}
        />
      </CardIconContainer>
    </ActivityCard>
  );
}
