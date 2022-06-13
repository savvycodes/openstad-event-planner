import { styled } from 'goober';
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
  font-weight: 700;
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
  display: flex;
  cursor: pointer;
  justify-content: center;
  font-family: ${props => props.theme.font.family};
  margin: 8px 4px;
  padding: 8px;
  background-color: ${props => props.theme.colors.background};
  box-shadow: ${props =>
    props.active ? props.theme.effects.boxShadowPrimary : 'none'};
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
