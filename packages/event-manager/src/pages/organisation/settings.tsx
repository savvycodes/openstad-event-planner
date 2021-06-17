import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { OrganisationForm } from '../signup/components/organisation-form';
import { useApi } from '../../hooks/use-api';
import { ErrorBanner } from '../../components/error-banner';
import { Spinner } from '../../components/spinner';
import { Button } from '../../components/button/button';
import { useDistricts } from '../../hooks/use-districts';
import { updateOrganisation } from '../../endpoints/organisation';
import { useConfig } from '../../context/config-context';

export function OrganisationSettingsPage() {
  const { data: organisation, loading, error } = useApi('/organisation/me');
  const districts = useDistricts();
  const config = useConfig();

  const [submitError, setError] = useState<Error | null>(null);

  if (!organisation || loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorBanner>
        Oeps! We konden je organisatie niet ophalen ({error.message})
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
      .min(10)
      .required('Telefoonnummer is verplicht'),
    email: Yup.string()
      .email()
      .required('E-mailadres is verplicht'),
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
    tagIds: Yup.array()
      .of(Yup.number())
      .min(1, 'U moet minimaal 1 type activiteit selecteren'),
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
        tagIds: organisation.tags.map((tag: any) => tag.id.toString()),
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
        } catch (err) {
          return setError(err);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
      validationSchema={organisationSchema}
    >
      {formik => (
        <Form>
          <OrganisationForm />
          {submitError ? (
            <ErrorBanner>
              Kon organisatie niet opslaan: {submitError.message}
            </ErrorBanner>
          ) : null}
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Spinner /> : 'Opslaan'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
