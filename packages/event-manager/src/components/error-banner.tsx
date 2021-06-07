import React from 'react';
import { styled } from 'goober';
import { lighten, padding, darken } from 'polished';

const Banner = styled('div')`
  font-family: ${props => props.theme.font.family};
  color: ${props => darken(0.2, props.theme.danger)};
  font-weight: 600;
  border: 1px solid ${props => props.theme.danger};
  border-radius: 4px;
  background-color: ${props => lighten(0.2, props.theme.danger)};
  ${props => padding(props.theme.sizes.md + 'px')};
`;

export function ErrorBanner(props: { children: React.ReactNode }) {
  return <Banner>{props.children}</Banner>;
}
