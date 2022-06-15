import React from 'react';
import { useFormikContext } from 'formik';

export default function FormButton(props: any) {
  const formik = useFormikContext();

  return (
    <button
      type="submit"
      disabled={!formik.isValid || formik.isSubmitting}
      {...props}
    >
      {props.children}
    </button>
  );
}
