import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { OrganisationForm } from '../signup/components/organisation-form';
import { useApi } from '../../hooks/use-api';
import { ErrorBanner } from '../../components/error-banner';
import { Spinner } from '../../components/spinner';
import { useDistricts } from '../../hooks/use-districts';
import { updateOrganisation } from '../../endpoints/organisation';
import { useConfig } from '../../context/config-context';

export function OrganisationSettingsPage() {
  const { data: organisation, loading, error } = useApi('/organisation/me');
  const districts = useDistricts();
  const config = useConfig();

  const [submitError, setError] = useState<Error | null>(null);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorBanner>
        Oeps! We konden je organisatie niet ophalen ({error.message})
      </ErrorBanner>
    );
  }

  if (!organisation?.id) {
    return (
      <ErrorBanner>
        Er is geen organisatie gekoppeld aan dit account
      </ErrorBanner>
    );
  }

  const organisationSchema = Yup.object().shape({
    name: Yup.string().required('Naam is verplicht'),
    street: Yup.string().nullable(),
    zip: Yup.string()
      .matches(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-zA-Z]{2}$/, 'Ongeldige postcode')
      .nullable(),
    district: Yup.string()
      .oneOf(districts)
      .required('Stadsdeel is verplicht'),
    phone: Yup.number()
      // .required('Telefoonnummer is verplicht')
      .nullable()
      .min(10),
    email: Yup.string()
      // .required('E-mailadres is verplicht')
      .email()
      .nullable(),
    website: Yup.string()
      .url()
      .nullable(),
    facebook: Yup.string()
      .url()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?(?:m.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\\-]*)?/,
        'Geen geldige Facebook URL'
      )
      .nullable(),
    instagram: Yup.string()
      .url()
      .nullable(),
  });

  return (
    <Formik
      initialValues={{
        name: organisation.name,
        street: organisation.street,
        zip: organisation.zip,
        email: organisation.email,
        phone: organisation.phone,
        district: organisation.district,
        website: organisation.website,
        facebook: organisation.facebook,
        instagram: organisation.instagram,
      }}
      onSubmit={async (values, helpers) => {
        helpers.setSubmitting(true);
        setError(null);
        try {
          const res = await updateOrganisation(config, organisation.id, values);
          if (res.status >= 400) {
            const err = await res.json();
            return setError(new Error(err.message));
          }
          window.location.reload();
        } catch (err:any) {
          return setError(err);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
      validationSchema={organisationSchema}
    >
      {formik => (
        <Form>
          <h3>Organisatiegegevens</h3>
          <OrganisationForm />
          {submitError ? (
            <ErrorBanner>
              Kon organisatie niet opslaan: {submitError.message}
            </ErrorBanner>
          ) : null}
          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Spinner /> : 'Opslaan'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
