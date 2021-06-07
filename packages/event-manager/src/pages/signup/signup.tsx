import * as React from 'react';
import * as Yup from 'yup';

import { Paragraph, Header, Main } from '../../components/forms/input';
import { Wizard, WizardStep } from '../../components/forms/wizard';
import { OrganisationForm } from './components/organisation-form';
import { ContactForm } from './components/contact-form';
import { MunicipalityContactForm } from './components/municipality-contact-form';

import { useHashLocation } from '../../components/hash-router';
import { useDistricts } from '../../hooks/use-districts';
import { useConfig } from '../../context/config-context';
import { createOrganisation } from '../../endpoints/organisation';
import { useUser } from '../../context/user-context';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';

const contactSchema = Yup.object().shape({
  contactName: Yup.string().required('Naam is verplicht'),
  contactPosition: Yup.string().required('Functie is verplicht'),
  contactPhone: Yup.string()
    .min(10)
    .required('Telefoonnummer is verplicht'),
  contactEmail: Yup.string()
    .email()
    .required('E-mailadres is verplicht'),
});

const municipalitySchema = Yup.object().shape({
  municipalityContactName: Yup.string().required('Naam is verplicht'),
  municipalityContactPhone: Yup.string()
    .min(10)
    .max(10)
    .required('Telefoonnummer is verplicht'),
  municipalityContactEmail: Yup.string()
    .email()
    .required('E-mailadres is verplicht'),
  municipalityContactStatement: Yup.string()
    .min(20)
    .required('Toelichting is verplicht'),
});

/**
 * Organisation signup wizard
 */
export function SignupPage() {
  const [, navigate] = useHashLocation();
  const districts = useDistricts();
  const config = useConfig();
  const { user } = useUser();

  const [submitError, setSubmitError] = React.useState<Error | null>(null);

  // This schema depends on districts and needs to update when districts change.
  const organisationSchema = Yup.object().shape({
    name: Yup.string().required('Naam is verplicht'),
    street: Yup.string().required('Straat + huisnummer is verplicht'),
    zip: Yup.string()
      .matches(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-zA-Z]{2}$/, 'Ongeldige postcode')
      .required('Postcode is verplicht'),
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
      .required('Website is verplicht'),
    facebook: Yup.string()
      .url()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?(?:m.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
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

  async function handleSubmit(values: any, form: any) {
    setSubmitError(null);
    try {
      form.setSubmitting(true);
      const res = await createOrganisation(config, values);
      const data = await res.json();
      if (res.status < 400) {
        // Success!
        return navigate('/pending-verification');
      }
      throw new Error(data.error || data.message);
    } catch (err) {
      setSubmitError(err);
      console.error('something went wrong', err);
    } finally {
      form.setSubmitting(false);
    }
  }

  if (!user) {
    return <Spinner />;
  }

  return (
    <Main>
      <Header>
        {submitError ? <ErrorBanner>{submitError.message}</ErrorBanner> : null}
        <Paragraph>Welkom Aanbieder {user.fullName || ''},</Paragraph>
        <Paragraph>
          Vul hieronder uw gegevens in. Vragen? Neem contact op met Y.
        </Paragraph>

        <Wizard
          onSubmit={handleSubmit}
          initialValues={{
            name: '',
            street: '',
            zip: '',
            email: '',
            phone: '',
            district: '',
            website: '',
            facebook: null,
            instagram: null,
            contactName: '',
            contactPosition: '',
            contactPhone: '',
            contactEmail: '',
            municipalityContactName: '',
            municipalityContactPhone: '',
            municipalityContactEmail: '',
            municipalityContactStatement: '',
            tagIds: [],
          }}
        >
          {/* First step: Organisation info */}
          <WizardStep validationSchema={organisationSchema}>
            <OrganisationForm />
          </WizardStep>

          {/* Second step: Contact information  */}
          <WizardStep validationSchema={contactSchema}>
            <ContactForm />
          </WizardStep>

          {/* Third step: Municipality contact */}
          <WizardStep validationSchema={municipalitySchema}>
            <MunicipalityContactForm />
          </WizardStep>
        </Wizard>
      </Header>
    </Main>
  );
}
