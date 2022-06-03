import React from 'react';
import { DefaultTheme, styled } from 'goober';
import { FieldProps, Form as FormikForm } from 'formik';

/**
 * Form helpers
 */
type InputProps = {
  error?: boolean;
} & DefaultTheme &
  any;

export const Form = styled(FormikForm)`
  display: block;
`;

export const StyledInput = styled('input')<InputProps>`
  padding: 8px 10px;
  border: ${props => !props.error && 'none'};
  display: block;
  box-shadow: ${props => props.theme.effects.boxShadowPrimary};
  margin-top: 8px;

  ${props => props.error && `border-color: ${props.theme.colors.danger};`};
`;

export const StyledTextArea = styled('textarea')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && props.theme.colors.danger};
  border: ${props => !props.error && 'none'};
  display: block;
  box-shadow: ${props => props.theme.effects.boxShadowPrimary};
  margin-top: 8px;
`;

export const StyledSelect = styled('select')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && props.theme.colors.danger};
  border: ${props => !props.error && 'none'};
  box-shadow: ${props => props.theme.effects.boxShadowPrimary};
  margin-top: 8px;
`;

export const FormItem = styled('div')`
  display: block;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;
export const CheckboxItem = styled('label')`
  display: flex;
  align-items: center;
  padding: 4px 0;
  width: fit-content;
`;

export const CheckboxList = styled('div')`
  display: inline;
`;

export const FileUpload = styled('label')`
  background-color: ${props => props.theme.colors.white};
  display: block;
  padding: 6px 12px;
  margin: 24px 0;
  box-shadow: ${props => props.theme.effects.boxShadowPrimary};
  cursor: pointer;
  color: grey;
  font-weight: 500;
  font-size: 16px;
`;

export const DisabledOption = styled('option')`
  color: green;
`;

export const Input = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps | any) => (
  <StyledInput
    {...field}
    {...props}
    error={touched[field.name] && errors[field.name] ? true : false}
  />
);

export const Select = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps | any) => (
  <StyledSelect
    {...field}
    {...props}
    error={touched[field.name] && errors[field.name] ? true : false}
  />
);

export const Textarea = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps | any) => (
  <StyledTextArea
    {...field}
    {...props}
    error={touched[field.name] && errors[field.name] ? true : false}
  />
);
