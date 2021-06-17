import { styled } from 'goober';

export const List = styled('li')`
  margin: 0 auto;
  list-style: none;
  padding: 12px;
`;

export const ListItem = styled('ul')`
  list-style: none;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0;
  box-shadow: ${props => props.theme.effects.boxShadowPrimary};
  position: relative;
`;
export const ListItemInformation = styled('div')`
  @media (max-width: 1023px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 24px;
  }
  @media (min-width: 1024px) {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 24px;
  }
`;
export const ListItemIcons = styled('div')`
  @media (max-width: 1023px) {
    float: right;
    margin: 0 24px;
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    cursor: pointer;
    position: absolute;
    right: 24px;
  }
`;

export const LocationListItem = styled('div')`
  padding: 0 4px;
  margin-top: 4px;
  box-shadow: ${props => props.theme.effects.boxShadowPrimary};
  background-color: white;
`;