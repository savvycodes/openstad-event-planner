import React from 'react';
import { styled } from 'goober';
import { padding } from 'polished';

const Banner = styled('div')`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.white};
  font-weight: 500;
  background-color: ${props =>  props.theme.colors.danger};
  ${props => padding(props.theme.sizes.md + 'px')};
`;

export function ErrorBanner(props: { children: React.ReactNode }) {
  return <Banner className="bw-banner">{props.children}</Banner>;
}
