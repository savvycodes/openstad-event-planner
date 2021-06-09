import { styled } from 'goober';
import theme from '../theme/index';

export const Main = styled('div')`
  background-color: ${theme.background};
`;
export const Header = styled('div')`
  margin: 12px;
`;

export const DFlex = styled('div')`
  display: flex;
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
