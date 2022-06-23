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

export const FormItem = styled('div')`
  display: block;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled('input')<InputProps>`
  ${props => props.error && `border-color: ${props.theme.colors.danger};`};
`;

export const StyledTextArea = styled('textarea')<InputProps>`
${props => props.error && `border-color: ${props.theme.colors.danger};`};
`;

export const StyledSelect = styled('select')<InputProps>`
  ${props => props.error && `border-color: ${props.theme.colors.danger};`};
`;

export const CheckboxItem = styled('label')`
  display: flex;
  align-items: center;
  padding: .5rem 0;
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
  <StyledSelect className="select"
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
