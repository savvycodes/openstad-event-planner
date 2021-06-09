import * as React from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import { useHashLocation } from '../../components/hash-router';
import { Input, FormItem, Form } from '../../components/forms/input';
import { Label, Paragraph } from '../../components/text/text';
import { Header, Main } from '../../components/layout/layout';
import { Button } from '../../components/button/button';
import { styled } from 'goober';

const schema = Yup.object().shape({
  name: Yup.string().required('Naam is verplicht'),
  surname: Yup.string().required('Achternaam is verplicht'),
  mailAddress: Yup.string()
    .email()
    .required('E-mailadres is verplicht'),
});

const styles = {
  Header: styled(Header)`
    width: 60%;
  `,
};

/**
 * Provider contact details form
 * @returns
 */
export function ProviderNewProviderPage(): JSX.Element {
  const [, navigate] = useHashLocation();

  return (
    <Main>
      <styles.Header>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim.
        </Paragraph>
      </styles.Header>
      <Formik
        initialValues={{
          name: '',
          mailAddress: '',
          surname: '',
        }}
        onSubmit={() => navigate('/aanbieder/aanbieders')}
        validationSchema={schema}
      >
        {form => (
          <Form onSubmit={form.handleSubmit}>
            <FormItem>
              <Label htmlFor="mailAddress">
                Email aanbieder
                <Input
                  id="mailAddress"
                  type="text"
                  name="mailAddress"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.mailAddress}
                  tabIndex={5}
                  error={form.errors.mailAddress}
                />
                <Paragraph>
                  <ErrorMessage name="mailAddress" />
                </Paragraph>
              </Label>
            </FormItem>
            <FormItem>
              <Label htmlFor="name">
                Naam aanbieder
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.name}
                  error={form.errors.name}
                  tabIndex={1}
                />
                <Paragraph>
                  <ErrorMessage name="name" />
                </Paragraph>
              </Label>
            </FormItem>
            <FormItem>
              <Label htmlFor="surname">
                Achternaam aanbieder
                <Input
                  id="surname"
                  type="text"
                  name="surname"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.surname}
                  error={form.errors.surname}
                  tabIndex={1}
                />
                <Paragraph>
                  <ErrorMessage name="surname" />
                </Paragraph>
              </Label>
            </FormItem>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                tabIndex={8}
                disabled={!form.isValid || form.isSubmitting}
              >
                Volgende
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Main>
  );
}
