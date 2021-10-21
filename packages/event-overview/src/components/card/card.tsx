import { styled } from 'goober';
import React, { MouseEventHandler } from 'react';
import { Edit3, Heart, Trash2 } from 'react-feather';
import { BorderedCardTitle } from '../text/text';

/**
 * Card helpers
 */
type CardProps = {
  newactivity?: boolean;
};

type IconProps = {
  active?: boolean;
};

export const CardWrapper = styled('div')`
  @media (min-width: 1024px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 16px;
    row-gap: 24px;
    column-gap: 24px;
  }
`;

export const IconWrapper = styled('div')`
  display: inline-block;
  background: rgba(242, 242, 242, 0.85);
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 100;
  border-radius: 24px;
  padding: 8px;
`;

export const IconContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeartIcon = styled(Heart)<IconProps>`
  fill: ${props => (props.active ? props.theme.colors.red : 'transparent')};
  stroke: ${props => (props.active ? props.theme.colors.red : '#000000')};
  display: inline-block;
  width: 18px;
  height: 18px;
`;

export const ActivityCard = styled('div')<CardProps>`
  cursor: pointer;
  background-color: ${props =>
    props.newactivity
      ? props.theme.colors.background
      : props.theme.colors.white};
  box-shadow: ${props => props.theme.effects.boxShadowPrimary};
  position: relative;
`;
export const CardTextContainer = styled('div')`
  width: 100%;
  padding: 8px 16px;
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
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -4px;
  padding: 0 16px 12px;
  bottom: 0;
`;

export const CardTag = styled('p')`
  font-size: 12px;
  line-height: 12px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  padding: 6px 8px;
  margin: 4px;
  font-weight: 500;
`;

export const NewActivityCardTextContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActivityImageWrapper = styled('div')`
  position: relative;
`;

export const ActivityImage = styled('img')`
  width: 100%;
  height: 240px;
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
      <ActivityImage src={src} alt={title} loading="lazy" />
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
