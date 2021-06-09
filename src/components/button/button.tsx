import { styled } from 'goober';
import theme from '../theme/index';

export const Button = styled('button')`
  background-color: ${theme.darkGray};
  border: none;
  padding: 1em 2em;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
`;
