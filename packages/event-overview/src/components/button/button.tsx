import { styled } from 'goober';

export const Button = styled('button')`
  background-color: ${props => props.theme.colors.darkGray};
  border: none;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
`;

export const SecondaryButton = styled('button')`
  border: none;
  font-size: 16px;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  padding: 10px 48px;
  
`;