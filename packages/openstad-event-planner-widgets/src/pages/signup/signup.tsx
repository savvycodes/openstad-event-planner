import * as React from 'react';
import * as Yup from 'yup';
import isEmpty from 'lodash.isempty';

import { Paragraph } from '../../components/text/text';
import { Header, Main } from '../../components/layout/layout';
import { Wizard, WizardStep } from '../../components/forms/wizard';
import { OrganisationForm } from './components/organisation-form';
import { ContactForm, contactSchema } from './components/contact-form';
// import { MunicipalityContactForm } from './components/municipality-contact-form';

import { useHashLocation } from '../../components/hash-router';
import { useDistricts } from '../../hooks/use-districts';
import { useConfig } from '../../context/config-context';
import { createOrganisation } from '../../endpoints/organisation';
import { useUser } from '../../context/user-context';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';

import { useApi } from '../../hooks/use-api';

// const municipalitySchema = Yup.object().shape({
//   municipalityContactName: Yup.string().required('Naam is verplicht'),
//   municipalityContactPhone: Yup.string()
//     .min(10)
//     .max(10)
//     .required('Telefoonnummer is verplicht'),
//   municipalityContactEmail: Yup.string()
//     .email()
//     .required('E-mailadres is verplicht'),
//   municipalityContactStatement: Yup.string()
//     .min(20)
//     .required('Toelichting is verplicht'),
// });

/**
 * Organisation signup wizard
 */
export function SignupPage() {
  const [, navigate] = useHashLocation();
  const districts = useDistricts();
  const config = useConfig();
  const { user } = useUser();
  const { data: organisation, loading } = useApi('/organisation/me');

  const [submitError, setSubmitError] = React.useState<Error | null>(null);

  // This schema depends on districts and needs to update when districts change.
  const organisationSchema = Yup.object().shape({
    name: Yup.string().required('Naam is verplicht'),
    street: Yup.string().nullable(),
    zip: Yup.string()
      .matches(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-zA-Z]{2}$/, 'Ongeldige postcode')
      .nullable(),
    district: Yup.string()
      .oneOf(districts)
      .required('Stadsdeel is verplicht'),
    website: Yup.string()
      .url()
      .nullable(),
    facebook: Yup.string()
      .url()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?(?:m.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w-]*)?/,
        'Geen geldige Facebook profiel/pagina URL (voorbeeld: https://facebook.com/gemeenteamsterdam)'
      )
      .nullable(),
    instagram: Yup.string()
      .url()
      .matches(
        /https?:\/\/(www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,30}(?:[A-Za-z0-9_]))?)(\/)?/,
        'Geen geldige Instagram profiel URL (voorbeeld: https://instagram.com/midzomermokum)'
      )
      .nullable(),
  });

  async function handleSubmit(values: any, form: any) {
    setSubmitError(null);
    try {
      form.setSubmitting(true);
      const res = await createOrganisation(config, values);
      const data = await res.json();
      if (res.status < 400) {
        // Success!
        return navigate('/events');
      }
      throw new Error(data.error || data.message);
    } catch (err) {
      setSubmitError(err);
      console.error('something went wrong', err);
    } finally {
      form.setSubmitting(false);
    }
  }

  if (!user || loading) {
    return <Spinner />;
  }

  if (!isEmpty(organisation)) {
    navigate('/events');
    return null;
  }

  return (
    <Main>
      <Header>
        {submitError ? <ErrorBanner>{submitError.message}</ErrorBanner> : null}
        <Paragraph>
          Welkom! Na het aanvullen van de data over je organisatie en jullie
          contactpersoon kan je aan de slag met het plaatsen van activiteiten
        </Paragraph>

        <Wizard
          onSubmit={handleSubmit}
          initialValues={{
            name: '',
            street: null,
            zip: null,
            email: '',
            phone: '',
            district: '',
            website: null,
            facebook: null,
            instagram: null,
            contactName: '',
            contactPosition: '',
            contactPhone: '',
            contactEmail: '',
            // municipalityContactName: '',
            // municipalityContactPhone: '',
            // municipalityContactEmail: '',
            // municipalityContactStatement: '',
            tagIds: [],
          }}
        >
          {/* First step: Organisation info */}
          <WizardStep validationSchema={organisationSchema}>
            <h1>Organisatiegegevens</h1>
            <p>stap 1 van 2</p>
            <OrganisationForm />
          </WizardStep>

          {/* Second step: Contact information  */}
          <WizardStep validationSchema={contactSchema}>
            <h1>Contactpersoon</h1>
            <p>stap 2 van 2</p>
            <Paragraph>
              Deze informatie gebruiken wij om contact met u op te nemen over
              het beheer van activiteiten en informatie op dit platform.
              Ingevoerde content is uiteindelijk alleen zichtbaar voor
              beheerders van dit platform.
            </Paragraph>
            <ContactForm />
          </WizardStep>

          {/* Third step: Municipality contact */}
          {/* <WizardStep validationSchema={municipalitySchema}>
            <MunicipalityContactForm />
          </WizardStep> */}
        </Wizard>
      </Header>
    </Main>
  );
}
