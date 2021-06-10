import React, { useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';

import { Label, Paragraph, Title } from '../../components/text/text';
import { Button } from '../../components/button/button';
import { Form, FormItem } from '../../components/forms/input';
import { Spinner } from '../../components/spinner';
import { useConfig } from '../../context/config-context';
import { useHashLocation } from '../../components/hash-router';
import { ErrorBanner } from '../../components/error-banner';
import { useUser } from '../../context/user-context';

const createUserSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
});

export function CreateUserPage() {
  const config = useConfig();
  const user = useUser();
  const [, navigate] = useHashLocation();
  const [error, setError] = useState<Error | null>(null);

  return (
    <Formik
      onSubmit={async (values, helpers) => {
        console.log('submit', values);
        setError(null);
        try {
          const res = await fetch(
            `${config.apiUrl}/api/site/${config.siteId}/user`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${user.jwt}`,
              },
              body: JSON.stringify({
                ...values,
                isEventProvider: true,
              }),
            }
          );

          if (res.status < 400) {
            navigate('/admin/users');
          } else {
            const data = await res.json();
            if (data.message.includes('ER_DUP_ENTRY')) {
              throw new Error(
                `Er bestaat al een gebruiker met het emailadres ${values.email}`
              );
            }
            throw new Error(`(${res.status}) ${data.message}`);
          }
        } catch (error) {
          console.error('something went wrong', error);
          setError(error);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={createUserSchema}
    >
      {form => (
        <Form onSubmit={form.handleSubmit}>
          <Title>Nieuwe aanbieders uitnodigen</Title>
          <Paragraph>
            Hiermee maak je een speciaal account aan voor aanbieders
          </Paragraph>

          {error ? (
            <ErrorBanner>Oeps! Er ging iets fout ({error.message})</ErrorBanner>
          ) : null}

          <FormItem>
            <Label>
              <Field name="firstName" placeholder="Voornaam" />
              <ErrorMessage name="firstName" />
            </Label>
          </FormItem>
          <FormItem>
            <Label>
              <Field name="lastName" placeholder="Achternaam" />
              <ErrorMessage name="lastName" />
            </Label>
          </FormItem>
          <FormItem>
            <Label>
              <Field name="email" type="email" placeholder="Email" />
              <ErrorMessage name="email" />
            </Label>
          </FormItem>
          <Button type="submit" disabled={form.isSubmitting || !form.isValid}>
            {form.isSubmitting ? <Spinner /> : 'Uitnodigen'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
