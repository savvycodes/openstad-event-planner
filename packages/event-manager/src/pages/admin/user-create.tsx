import React, { useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { styled } from 'goober';

import { Label, Paragraph } from '../../components/text/text';
import { Button } from '../../components/button/button';
import { Form, FormItem, Input } from '../../components/forms/input';
import { Header, Main } from '../../components/layout/layout';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';
import { useHashLocation } from '../../components/hash-router';

import { useConfig } from '../../context/config-context';
import { useUser } from '../../context/user-context';

const createUserSchema = Yup.object().shape({
  firstName: Yup.string().required('Voornaam is verplicht'),
  lastName: Yup.string().required('Achternaam is verplicht'),
  email: Yup.string()
    .email()
    .required('E-mailadres is verplicht'),
});

const styles = {
  Header: styled(Header)`
    width: 60%;
  `,
};

export function CreateUserPage() {
  const config = useConfig();
  const user = useUser();
  const [, navigate] = useHashLocation();
  const [error, setError] = useState<Error | null>(null);

  return (
    <Main>
      <styles.Header>
        <Paragraph>
          Hiermee maak je een speciaal account aan voor aanbieders
        </Paragraph>
      </styles.Header>
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
            {error ? (
              <ErrorBanner>
                Oeps! Er ging iets fout ({error.message})
              </ErrorBanner>
            ) : null}

            <FormItem>
              <Label>
                Voornaam aanbieder
                <Field
                  name="firstName"
                  placeholder="Voornaam"
                  component={Input}
                />
                <Paragraph>
                  <ErrorMessage name="firstName" />
                </Paragraph>
              </Label>
            </FormItem>
            <FormItem>
              <Label>
                Achternaam aanbieder
                <Field
                  name="lastName"
                  placeholder="Achternaam"
                  component={Input}
                />
                <Paragraph>
                  <ErrorMessage name="lastName" />
                </Paragraph>
              </Label>
            </FormItem>
            <FormItem>
              <Label>
                Email aanbieder
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  component={Input}
                />
                <Paragraph>
                  <ErrorMessage name="email" />
                </Paragraph>
              </Label>
            </FormItem>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                disabled={form.isSubmitting || !form.isValid}
              >
                {form.isSubmitting ? <Spinner /> : 'Uitnodigen'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Main>
  );
}
