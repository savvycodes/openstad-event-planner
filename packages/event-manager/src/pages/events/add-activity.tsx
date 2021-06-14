import * as React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
        .min(2),
    })
    .required('Locatie is verplicht'),
  district: Yup.string().required('Stadsdeel is verplicht'),
  price: Yup.number(),
  attendees: Yup.number().required('Aantal beschikbare plekken is verplicht'),
  information: Yup.string(),
  dates: Yup.array()
    .of(Yup.date())
    .min(1, 'Kies minimaal 1 datum')
    .required('Datum is verplicht'),
  startTime: Yup.string().required('Aanvangsttijd is verplicht'),
  endTime: Yup.string().required('Eindtijd is verplicht'),
  tagIds: Yup.array()
    .of(Yup.string())
    .min(1, 'U moet minimaal 1 type activiteit selecteren'),
  ages: Yup.array()
    .of(Yup.string())
    .min(1, 'U moet minimaal 1 leeftijd selecteren'),
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
        price: values.needToPay === 'free' ? 0 : values.price * 100,
        attendees: values.attendees,
        information: values.information,
        image: values.image,
        tagIds: values.tagIds,
      };

      // Find min and max age
      const allAges = values.ages
        .map((group: string) => group.split('-'))
        .flat()
        .map((age: string) => parseInt(age));
      const minAge = Math.min(...allAges);
      const maxAge = Math.max(...allAges);

      payload.minAge = minAge;
      payload.maxAge = maxAge;

      // Merge time with date for each slot
      const [startHour, startMin] = values.startTime
        .split(':')
        .map((v: string) => parseInt(v));
      const [endHour, endMin] = values.endTime
        .split(':')
        .map((v: string) => parseInt(v));

      payload.slots = values.dates.map((date: Date) => {
        const start = new Date(date);
        start.setHours(startHour);
        start.setMinutes(startMin);
        start.setSeconds(0);
        const end = new Date(date);
        end.setHours(endHour);
        end.setMinutes(endMin);
        end.setSeconds(0);
        return {
          startTime: start,
          endTime: end,
        };
      });

      await createEvent(config, payload);

      navigate('/events');
    } catch (err) {
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

        <Paragraph>Nieuwe activiteit toevoegen</Paragraph>
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
          price: 0,
          attendees: 0,
          information: '',
          tagIds: [],
          ages: [],
          image: '',
          dates: [],
          startTime: '11:00',
          endTime: '17:00',
          needToPay: 'free',
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
