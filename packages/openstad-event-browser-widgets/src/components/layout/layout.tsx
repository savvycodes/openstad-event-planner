import { styled } from 'goober';

/**
 * Form helpers
 */
type InputProps = {
  active?: boolean;
};

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

export const NavigationItem = styled('button')<InputProps>`
  background-color: ${props => props.active ? '#00387A' : '#fff'};
  color: ${props => props.active ? '#fff' : '#004699'};
  border: 2px solid ${props => props.active ? '#00387A' : '#004699'};;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${props => props.active ? '#fff' : '#00387A'};
    border: 2px solid #00387A;
    background-color: ${props => props.active ? '#00387A' : '#fff'};
  }
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
