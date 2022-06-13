import React from 'react';
import { Button } from './button';
import { useFormikContext } from 'formik';

export default function FormButton(props: any) {
  const formik = useFormikContext();

  return (
    <Button
      type="submit"
      disabled={!formik.isValid || formik.isSubmitting}
      {...props}
    >
      {props.children}
    </Button>
  );
}
