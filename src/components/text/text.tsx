import { styled } from 'goober';
import React from 'react';
import theme from '../theme/index';

/**
 * Text helpers
 */

type TextProps = {
  active?: boolean;
};

export const Paragraph = styled('p')`
  font-size: 0.8rem;
  font-family: 'Noto Sans', sans-serif;
`;

export const Title = styled('h1')`
  font-size 1.5rem;
  font-family: 'Noto Sans', sans-serif;
  display: inline-block;
`;

export const Label = styled('label')`
  font-weight: 700;
  font-family: 'Noto Sans', sans-serif;
`;
export const ListLabel = styled('label')`
  padding: 0 8px;
  font-size: 0.9rem;
  font-family: 'Noto Sans', sans-serif;
`;

export const CardTitle = styled('h1')`
  font-size: 1.2rem;
  font-family: 'Noto Sans', sans-serif;
  display: inline-block;
`;
export const NewActivityTitle = styled('h1')`
  @media (min-width: 1024px) {
    font-size: 1.2rem;
    font-family: 'Noto Sans', sans-serif;
    margin: 12px;
    color: ${theme.darkestGray};
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const NavItem = styled('p')<TextProps>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  font-family: 'Noto Sans', sans-serif;
  margin: 8px 4px;
  padding: 8px;
  background-color: ${theme.background};
  box-shadow: ${props => (props.active ? theme.boxShadowPrimary : 'none')};
`;

const Border = styled('div')`
  width: 50%;
  border-bottom: 3px solid ${theme.primary};
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
