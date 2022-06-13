import { styled } from 'goober';
import { backgrounds } from 'polished';
import React from 'react';

/**
 * Text helpers
 */

type TextProps = {
  active?: boolean;
};

export const Paragraph = styled('p')`
  font-size: 14px;
  font-family: ${props => props.theme.font.family};
`;

export const Title = styled('h1')`
  font-size: 24px;
  font-family: ${props => props.theme.font.family};
  display: inline-block;
`;

export const Label = styled('label')`
  font-family: ${props => props.theme.font.family};
`;
export const ListLabel = styled('label')`
  padding: 0 8px;
  font-size: 14px;
  font-family: ${props => props.theme.font.family};
`;

export const CardTitle = styled('h1')`
  font-size: 18px;
  font-family: ${props => props.theme.font.family};
  display: inline-block;
`;
export const NewActivityTitle = styled('h1')`
  @media (min-width: 1024px) {
    font-size: 18px;
    font-family: ${props => props.theme.font.family};
    margin: 12px;
    color: ${props => props.theme.colors.darkestGray};
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const NavItem = styled('p')<TextProps>`
  padding: .5rem 1.5rem;
  cursor: pointer;
  background-color: ${props => props.active ? '#004699' : '#fff'};
  color: ${props => props.active ? '#fff' : '#004699'};
`;

const Border = styled('div')`
  width: 50%;
  border-bottom: 3px solid ${props => props.theme.colors.primary};
`;

export function BorderedTitle(props: any) {
  return (
    <Title>
      {props.title}
      <Border />
    </Title>
  );
}
export function BorderedCardTitle(props: any) {
  return (
    <CardTitle>
      {props.title}
      <Border />
    </CardTitle>
  );
}
