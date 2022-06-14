import * as React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';

import { useHashLocation } from '../../components/hash-router';
import { BorderedTitle, Paragraph } from '../../components/text/text';
import { Header, Main } from '../../components/layout/layout';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';
import { ActivityForm } from './components/form';

import { useApi } from '../../hooks/use-api';
import { useDistricts } from '../../hooks/use-districts';
import { useConfig } from '../../context/config-context';
import { createEvent } from '../../endpoints/event';

export const schema = Yup.object().shape({
  name: Yup.string().required('Naam is verplicht'),
  description: Yup.string().required('Beschrijving is verplicht'),
  location: Yup.object()
    .shape({
      type: Yup.string().required(),
      coordinates: Yup.array()
        .of(Yup.number())
        .min(2, 'Locatie is verplicht'),
    })
    .required('Locatie is verplicht'),
  district: Yup.string().required('Stadsdeel is verplicht'),
  price: Yup.string(),
  attendees: Yup.number().required('Aantal beschikbare plekken is verplicht'),
  information: Yup.string(),
  slots: Yup.array()
    .of(
      Yup.object().shape({
        startTime: Yup.date().required('Startdatum en tijd zijn verplicht'),
        endTime: Yup.date()
          .min(
            Yup.ref('startTime'),
            'Einddatum en tijd moeten na startdatum en tijd zijn'
          )
          .required('Einddatum en tijd zijn verplicht'),
      })
    )
    .min(1, 'Kies minimaal 1 start- en einddatum')
    .required('Datum is verplicht'),
  tagIds: Yup.array()
    .of(Yup.string())
    .min(1, 'U moet minimaal 1 type activiteit selecteren'),
  needToPay: Yup.string(),
});

/**
 * Provider contact details form
 * @returns
 */
export function ProviderAddActivityPage(): JSX.Element {
  const [, navigate] = useHashLocation();
  const config = useConfig();
  const districts = useDistricts();

  // fetch data
  const {
    data: organisation,
    loading: organisationLoading,
    error: organisationError,
  } = useApi('/organisation/me');
  const { data: tags, loading: tagsLoading } = useApi('/tag');

  const [submitError, setSubmitError] = React.useState<Error | null>(null);
  const loading = organisationLoading || tagsLoading;

  /**
   * Form submit handler to create or update an event
   *
   * @param values
   * @param formHelpers
   */
  async function handleSubmit(values: any, formHelpers: any) {
    setSubmitError(null);
    try {
      const payload: any = {
        name: values.name,
        description: values.description,
        location: values.location,
        district: values.district,
        price: values.price,
        attendees: values.attendees,
        information: values.information,
        image: values.image,
        tagIds: values.tagIds,
        slots: values.slots,
      };

      await createEvent(config, payload);

      navigate('/events');
    } catch (err) {
      console.error('form submit error', err);
      setSubmitError(err);
    } finally {
      formHelpers.setSubmitting(false);
    }
  }

  if (loading || !organisation || !tags) {
    return <Spinner />;
  }

  if (organisationError) {
    return (
      <ErrorBanner>
        Oeps! We konden je organisatie niet ophalen ({organisationError.message}
        )
      </ErrorBanner>
    );
  }

  return (
    <Main>
      <Header>
        <BorderedTitle title={organisation.name} />

        <Paragraph>Nieuwe activiteit toevoegen (test 123)</Paragraph>
      </Header>

      <Formik
        initialValues={{
          name: '',
          description: '',
          location: {
            type: 'Point',
            coordinates: [],
          },
          district: '',
          price: '',
          attendees: 0,
          information: '',
          tagIds: [],
          ages: [],
          image: '',
          slots: [
            {
              startTime: addDays(new Date(), 1),
              endTime: addHours(addDays(new Date(), 1), 1),
            },
          ],
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {() => (
          <ActivityForm
            organisation={organisation}
            districts={districts}
            tags={tags}
          />
        )}
      </Formik>
      {submitError ? (
        <ErrorBanner>
          Oeps! We konden je activiteit niet opslaan: ({submitError.message})
        </ErrorBanner>
      ) : null}
    </Main>
  );
}
