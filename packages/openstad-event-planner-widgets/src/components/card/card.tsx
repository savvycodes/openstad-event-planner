import { styled } from 'goober';
import React, { MouseEventHandler } from 'react';
import { Edit3, Trash2, Sun } from 'react-feather';

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
    grid-gap: 1rem;
    align-items: stretch;
    justify-content: center;
    padding-top: 1rem;
  }
`;

export const ActivityCard = styled('div')<CardProps>`
  cursor: pointer;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
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

export const NewActivityCardTextContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActivityCardPinContainer = styled('div')`
  min-width: 1rem;
  min-height: 1rem;
  padding: 0.5rem;
  top: 0;
  left: 0;
  position: absolute;
`;

export const ActivityImage = styled('img')`
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
  description: string;
  isHighlighted?: boolean;
  onDelete?: MouseEventHandler;
  onEdit?: MouseEventHandler;
};

export function ActivityCards({
  src,
  title,
  description,
  isHighlighted = false,
  onDelete = () => null,
  onEdit = () => null,
}: ActivityCardsProps) {
  return (
    <ActivityCard className="activity-card">
      {isHighlighted ? (
        <ActivityCardPinContainer>
          <Sun size={24} stroke={'#F39200'} />
        </ActivityCardPinContainer>
      ) : null}

      <img className="activity-card__image" src={src + '/:/rs=w:550px'} />
      <div className="activity-card__content">
        <h3>{title.slice(0, 20) + '...'}</h3>
        <p>{description.replace(/<[^>]+>/g, '').slice(0, 100) + '...'}</p>
        <div className="activity-card__actions">
          <Trash2 size={24} stroke={'#000'} onClick={onDelete} />
          <Edit3 stroke={'#000'} size={24} onClick={onEdit} />
        </div>
      </div>
    </ActivityCard>
  );
}
