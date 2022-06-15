import React from 'react';
import { Form, Formik } from 'formik';

import { ContactForm, contactSchema } from '../signup/components/contact-form';
import { Title } from '../../components/text/text';
import FormButton from '../../components/button/form-button';
import { ErrorBanner } from '../../components/error-banner';
import { Spinner } from '../../components/spinner';

import { useApi } from '../../hooks/use-api';
import { useConfig } from '../../context/config-context';
import { updateOrganisation } from '../../endpoints/organisation';

export function ContactDetailsPage() {
  const { data: organisation, loading, error, reload } = useApi(
    '/organisation/me'
  );
  const config = useConfig();

  async function handleSubmit(values: any, actions: any) {
    console.log('onsubmit', { values, actions });
    try {
      await updateOrganisation(config, organisation.id, values);
      reload();
    } catch (error) {
      console.error('Could not update organisation', error);
    } finally {
      actions.setSubmitting(false);
    }
  }

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

  return (
    <Formik
      initialValues={{
        contactName: organisation.contactName,
        contactPosition: organisation.contactPosition,
        contactPhone: organisation.contactPhone,
        contactEmail: organisation.contactEmail,
      }}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <h3>Contactpersoon</h3>
          <ContactForm />
          <FormButton>Opslaan</FormButton>
        </Form>
      )}
    </Formik>
  );
}
