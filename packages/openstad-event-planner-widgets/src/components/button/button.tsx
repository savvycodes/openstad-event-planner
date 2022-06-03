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
  cursor: pointer;
  border: none;
  float: right;
  margin-right: 6px;
  background-color: ${props => props.theme.colors.darkGray};
  padding: 4px 16px;
  border-radius: 50px;
`;
