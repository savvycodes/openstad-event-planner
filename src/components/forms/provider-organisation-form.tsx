import * as React from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { styled } from 'goober';
import { useHashLocation } from '../hash-router';

/**
 * Form helpers
 */
type InputProps = {
  error?: string;
};
const Input = styled('input')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && 'red'};
`;
const Label = styled('label')`
  font-weight: bold;
`;

const schema = Yup.object().shape({
  name: Yup.string().required('Naam is verplicht'),
  street: Yup.string().required('Straat + huisnummer is verplicht'),
  zip: Yup.string().required('Postcode is verplicht'),
  phoneNumber: Yup.number()
    .min(10)
    // .max(10)
    .required('Telefoonnummer is verplicht'),
  mailAddress: Yup.string()
    .email()
    .required('E-mailadres is verplicht'),
  website: Yup.string().url(),
  facebook: Yup.string()
    .url()
    .matches(
      /(?:(?:http|https):\/\/)?(?:www.)?(?:m.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
      'Geen geldige facebook URL'
    ),
  instagram: Yup.string().url(),
});

/**
 * Provider contact details form
 * @returns
 */
export function ProviderOrganisationForm(): JSX.Element {
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
          street: 'Stadhuisplein 1',
          zip: '1234 AA',
          phoneNumber: '0206241111',
          mailAddress: 'midzomermokum@amsterdam.nl',
          website: 'https://amsterdam.nl',
          facebook: '',
          instagram: '',
        }}
        onSubmit={() => navigate('/aanbieder/contact')}
        validationSchema={schema}
      >
        {form => (
          <form onSubmit={form.handleSubmit}>
            <Label htmlFor="name">
              Naam organisatie
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Naam organisatie"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.name}
                error={form.errors.name}
                tabIndex={1}
              />
              <ErrorMessage name="name" />
            </Label>

            <Label htmlFor="street">
              Adres organisatie
              <Input
                id="street"
                type="text"
                name="street"
                placeholder="Straat + huisnummer"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.street}
                tabIndex={2}
                error={form.errors.street}
              />
              <Input
                id="zip"
                type="text"
                name="zip"
                placeholder="Postcode"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.zip}
                tabIndex={3}
                error={form.errors.zip}
              />
              <ErrorMessage name="street" />
              <ErrorMessage name="zip" />
            </Label>

            <Label htmlFor="phoneNumber">
              Algemeen telefoonnummer organisatie
              <Input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="0206241111"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.phoneNumber}
                tabIndex={4}
                error={form.errors.phoneNumber}
              />
              <ErrorMessage name="phoneNumber" />
            </Label>

            <Label htmlFor="mailAddress">
              Algemeen mailadres organisatie
              <Input
                id="mailAddress"
                type="text"
                name="mailAddress"
                placeholder="midzomermokum@amsterdam.nl"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.mailAddress}
                tabIndex={5}
                error={form.errors.mailAddress}
              />
              <ErrorMessage name="mailAddress" />
            </Label>

            <Label htmlFor="website">
              Website organisatie
              <Input
                id="website"
                type="text"
                name="website"
                placeholder="https://amsterdam.nl"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.website}
                tabIndex={5}
                error={form.errors.website}
              />
              <ErrorMessage name="website" />
            </Label>

            <Label>
              Social media organisatie
              <Input
                type="text"
                name="facebook"
                placeholder="https://facebook.com/"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.facebook}
                tabIndex={6}
                error={form.errors.facebook}
              />
              <ErrorMessage name="facebook" />
              <Input
                type="text"
                name="instagram"
                placeholder="https://instagram.com/"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.instagram}
                tabIndex={7}
                error={form.errors.instagram}
              />
              <ErrorMessage name="instagram" />
            </Label>

            <Label>Actief in type activiteit</Label>

            <button
              type="submit"
              tabIndex={8}
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
