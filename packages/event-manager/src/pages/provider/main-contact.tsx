import * as React from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import { useHashLocation } from '../../components/hash-router';
import { Input, Label } from '../../components/forms/input';

const schema = Yup.object().shape({
  name: Yup.string().required('Naam is verplicht'),
  position: Yup.string().required('Functie is verplicht'),
  phone: Yup.number()
    .min(10)
    // .max(10)
    .required('Telefoonnummer is verplicht'),
  email: Yup.string()
    .email()
    .required('E-mailadres is verplicht'),
  street: Yup.string().required('Straat + huisnummer is verplicht'),
  zip: Yup.string().required('Postcode is verplicht'),
});

/**
 * @returns
 */
export function ProviderMainContactPage(): JSX.Element {
  const [, navigate] = useHashLocation();

  return (
    <>
      <p>Welkom Aanbieder X,</p>
      <p>Vul hieronder uw gegevens in. Vragen? Neem contact op met Y.</p>
      <p>
        Deze informatie is zichbaar als de algemene contactinformatie op het
        platform. Ingevoerde content is uiteindelijk zichtbaar voor alle
        bezoekers op het platform.
      </p>
      <Formik
        initialValues={{
          name: 'Jante Beton',
          position: 'Directeur',
          email: 'midzomermokum@amsterdam.nl',
          phone: '0612345678',
        }}
        onSubmit={() => navigate('/')}
        validationSchema={schema}
      >
        {form => (
          <form onSubmit={form.handleSubmit}>
            <Label htmlFor="name">
              Naam contactpersoon
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Naam contactpersoon"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.name}
                error={form.errors.name}
                tabIndex={1}
              />
              <ErrorMessage name="name" />
            </Label>

            <Label htmlFor="position">
              Naam contactpersoon
              <Input
                id="position"
                type="text"
                name="position"
                placeholder="Functie contactpersoon"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.position}
                error={form.errors.position}
                tabIndex={2}
              />
              <ErrorMessage name="position" />
            </Label>

            <Label htmlFor="email">
              Mail contactpersoon
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="Mail contactpersoon"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.email}
                error={form.errors.email}
                tabIndex={3}
              />
              <ErrorMessage name="email" />
            </Label>

            <Label htmlFor="phone">
              Telefoon contactpersoon
              <Input
                id="phone"
                type="text"
                name="phone"
                placeholder="Functie contactpersoon"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.phone}
                error={form.errors.phone}
                tabIndex={4}
              />
              <ErrorMessage name="phone" />
            </Label>

            <button
              type="submit"
              tabIndex={5}
              disabled={!form.isValid || form.isSubmitting}
            >
              Volgende
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
