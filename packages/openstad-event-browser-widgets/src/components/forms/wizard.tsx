import React, { FunctionComponent, useState } from 'react';
import {
  Formik,
  Form,
  FormikValues,
  FormikConfig,
  FormikHelpers,
} from 'formik';
import { Button } from '../button/button';
import { Spinner } from '../spinner';

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
export function Wizard({
  children,
  initialValues,
  onSubmit,
}: FormikConfig<FormikValues>) {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: React.SetStateAction<FormikValues>) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: React.SetStateAction<FormikValues>) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (
    values: React.SetStateAction<FormikValues>,
    bag: FormikHelpers<FormikValues>
  ) => {
    if (
      React.isValidElement<{
        onSubmit: (
          values: FormikValues,
          formikHelpers: FormikHelpers<FormikValues>
        ) => void | Promise<any>;
      }>(step) &&
      step.props.onSubmit
    ) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={
        React.isValidElement<{ validationSchema: any | (() => any) }>(step)
          ? step.props.validationSchema
          : null
      }
    >
      {formik => (
        <Form>
          {step}
          <div style={{ display: 'flex' }}>
            {stepNumber > 0 && (
              <Button onClick={() => previous(formik.values)} type="button">
                Terug
              </Button>
            )}
            <div>
              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? <Spinner /> : 'Volgende'}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

type WizardStepProps = {
  onSubmit?: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
  validationSchema?: any | (() => any);
  children: any;
};

export const WizardStep: FunctionComponent<WizardStepProps> = ({ children }) =>
  children;
