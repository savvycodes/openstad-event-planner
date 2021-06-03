import { styled } from 'goober';

/**
 * Form helpers
 */
type InputProps = {
  error?: string;
};
export const Input = styled('input')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error};
`;
export const Label = styled('label')`
  font-weight: bold;
`;
