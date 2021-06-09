import { styled } from 'goober';
import theme from '../theme/index';

/**
 * Form helpers
 */
type InputProps = {
  error?: string;
};

export const Form = styled('form')`
  display: block;
`;

export const Input = styled('input')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && theme.red};
  border: ${props => !props.error && 'none'};
  display: block;
  box-shadow: ${theme.boxShadowPrimary};
  margin-top: 8px;
`;
export const TextArea = styled('textarea')<InputProps>`
  resize: none;
  padding: 8px 10px;
  border-color: ${props => props.error && theme.red};
  border: ${props => !props.error && 'none'};
  display: block;
  box-shadow: ${theme.boxShadowPrimary};
  margin-top: 8px;
`;

export const Select = styled('select')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && theme.red};
  border: ${props => !props.error && 'none'};
  box-shadow: ${theme.boxShadowPrimary};
  margin-top: 8px;
`;

export const FormItem = styled('div')`
  display: block;
  padding: 12px;
  justify-content center;
  align-items: center;
`;
export const CheckboxItem = styled('div')`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

export const List = styled('div')`
  display: inline;
`;
export const FileUpload = styled('label')`
  background-color: ${theme.white};
  display: block;
  padding: 6px 12px;
  margin: 24px 0;
  width: 300px;
  box-shadow: ${theme.boxShadowPrimary};
  cursor: pointer;
  color: grey;
  font-weight: 500;
  font-size: 0.9rem;
  width: 50%;
`;
