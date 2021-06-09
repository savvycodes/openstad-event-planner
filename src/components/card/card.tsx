import { styled } from 'goober';
import React from 'react';
import { Edit3, Trash2 } from 'react-feather';
import { BorderedCardTitle } from '../text/text';
import theme from '../theme/index';

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
  width: (100/3) %;
  height: 42.5vh;
  background-color: ${props =>
    props.newactivity ? theme.background : theme.white};
  box-shadow: ${theme.boxShadowPrimary};
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
    background-color: ${theme.background};
    box-shadow: ${theme.boxShadowPrimary};
    padding: 0 4px;
  }
  @media (min-width: 1024px) {
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    background-color: ${theme.background};
    box-shadow: ${theme.boxShadowPrimary};
    position: absolute;
    right: 0;
    padding: 4px 12px;
  }
`;

export function ActivityCards(props: any) {
  return (
    <ActivityCard newactivity>
      <ActivityImage src={props.src} />
      <CardTextContainer>
        <BorderedCardTitle title={props.title} />
      </CardTextContainer>
      <CardIconContainer>
        <Trash2
          style={{ float: 'right', padding: '0 4px' }}
          size={18}
          stroke={'#7a7a7a'}
        />
        <Edit3 style={{ float: 'right' }} stroke={'#7a7a7a'} size={18} />
      </CardIconContainer>
    </ActivityCard>
  );
}
