import * as React from 'react';
import { Formik } from 'formik';

import { useHashLocation } from '../../components/hash-router';
import { BorderedTitle, Paragraph } from '../../components/text/text';
import { Header, Main } from '../../components/layout/layout';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';
import { ActivityForm } from './components/form';

import { useApi } from '../../hooks/use-api';
import { useDistricts } from '../../hooks/use-districts';
import { useConfig } from '../../context/config-context';
import { updateEvent } from '../../endpoints/event';

import { schema } from './add-activity';
import { RouteComponentProps } from 'wouter';

/**
 * Edit event
 * @returns
 */
export function EditActivityPage({ params }: RouteComponentProps): JSX.Element {
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
  const { data: event, loading: eventLoading } = useApi(`/event/${params.id}`);

  const [submitError, setSubmitError] = React.useState<Error | null>(null);
  const loading = organisationLoading || tagsLoading || eventLoading;

  /**
   * Form submit handler to update an event
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

      await updateEvent(config, params.id, payload);

      navigate('/events');
    } catch (err) {
      setSubmitError(err);
    } finally {
      formHelpers.setSubmitting(false);
    }
  }

  function getInitialValues(event: any) {
    const startDate = new Date(event.slots[0].startTime);
    const endDate = new Date(event.slots[0].endTime);

    const startTime = startDate
      .toTimeString()
      .split(' ')[0]
      .split(':')
      .slice(0, 2)
      .join(':');
    const endTime = endDate
      .toTimeString()
      .split(' ')[0]
      .split(':')
      .slice(0, 2)
      .join(':');

    const ages = ['0-4', '4-8', '8-12', '12-16', '16-18', '18-99'].filter(
      ageGroup => {
        const [min, max] = ageGroup.split('-').map(age => parseInt(age));

        if (event.minAge <= min && event.maxAge >= max) {
          return true;
        }

        return false;
      }
    );

    return {
      name: event.name,
      description: event.description,
      location: event.location,
      district: event.district,
      price: event.price / 100,
      attendees: event.attendees,
      information: event.information,
      tagIds: event.tags.map((tag: any) => tag.id.toString()),
      ages: ages,
      image: event.image,
      dates: event.slots.map((slot: any) => new Date(slot.startTime)),
      startTime: startTime,
      endTime: endTime,
      needToPay: event.price > 0 ? 'paid' : 'free',
    };
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

        <Paragraph>Activiteit bewerken</Paragraph>
      </Header>

      <Formik
        initialValues={getInitialValues(event)}
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
