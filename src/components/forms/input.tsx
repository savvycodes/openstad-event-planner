import { styled } from 'goober';

/**
 * Form helpers
 */
type InputProps = {
  error?: string;
};

export const Main = styled('div')`
  @media (max-width: 1023px) {
    padding: 12px 4px;
    background-color: #f3f3f3;
  }
  @media (min-width: 1024px) {
    background-color: #f3f3f3;
    padding: 24px;
    margin: 24px 15%;
  }
`;

export const Header = styled('div')`
  margin: 12px;
`;
export const Paragraph = styled('p')`
  font-size: 0.8rem;
  font-family: 'Noto Sans', sans-serif;
`;

export const Form = styled('form')`
  display: block;
`;

export const Input = styled('input')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && 'red'};
  border: ${props => !props.error && 'none'};
  display: block;
  box-shadow: 0 6px 9px 0px #ccc;
  margin-top: 8px;
`;

export const Select = styled('select')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && 'red'};
  border: ${props => !props.error && 'none'};
  box-shadow: 0 6px 9px 0px #ccc;
  margin-top: 8px;
`;
export const Label = styled('label')`
  font-weight: 700;
  font-family: 'Noto Sans', sans-serif;
`;
export const ListLabel = styled('label')`
  padding: 0 8px;
  font-size: 0.9rem;
  font-family: 'Noto Sans', sans-serif;
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

export const DisabledOption = styled('option')`
  color: green;
`;

export const Button = styled('button')`
  background-color: #c0bcbc;
  border: none;
  padding: 1em 2em;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
`;
