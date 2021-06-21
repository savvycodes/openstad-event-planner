import { styled } from 'goober';

export const Button = styled('button')`
  background-color: ${props => props.theme.colors.darkGray};
  border: none;
  padding: 1em 2em;
  font-size: 14px;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
`;

export const AddDateTimeButton = styled('div')`
  @media (max-width: 1023px) {
    cursor: pointer;
    border: none;
    align-items: center;
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.effects.boxShadowPrimary};
    padding: 0 4px;
  }
  @media (min-width: 1024px) {
    cursor: pointer;
    border: none;
    float: right;
    margin-right: 6px;
  }
`;
