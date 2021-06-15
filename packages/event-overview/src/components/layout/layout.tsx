import { styled } from 'goober';

/**
 * Form helpers
 */
 type InputProps = {
  active?: boolean;
}

export const Main = styled('div')`
  background-color: ${props => props.theme.colors.background};
  padding: 12px 0;
`;
export const Header = styled('div')`
  margin: 12px;
`;

export const DFlex = styled('div')`
  display: flex;
`;

export const NavigationItem = styled('div')<InputProps>`
  padding: 12px;
  margin-left: 12px;
  background-color: ${props => props.theme.colors.background};
  box-shadow: ${props => props.active ? props.theme.effects.boxShadowPrimary : 'none'};
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const HeaderNavigation = styled('div')`
  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    margin-bottom: 36px;
  }
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const EmptyState = styled('div')`
  display: inline-block;
  text-align: center;
  width: 100%;
  margin: 0 auto;
`;
