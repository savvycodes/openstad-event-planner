import * as React from 'react';
import { Formik } from 'formik';
import { RouteComponentProps, Redirect } from 'wouter';

import { useHashLocation } from '../../components/hash-router';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';
import { ActivityForm } from './components/form';

import { useApi } from '../../hooks/use-api';
import { useDistricts } from '../../hooks/use-districts';
import { useConfig } from '../../context/config-context';
import { updateEvent } from '../../endpoints/event';

import { schema } from './add-activity';

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
        price: values.price,
        attendees: values.attendees,
        information: values.information,
        image: values.image,
        tagIds: values.tagIds,
        slots: values.slots,
        highlighted: values.highlighted
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

      await updateEvent(config, params.id, payload);

      navigate('/events');
    } catch (err:any) {
      setSubmitError(err);
    } finally {
      formHelpers.setSubmitting(false);
    }
  }

  function getInitialValues(event: any) {
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
      price: event.price,
      attendees: event.attendees,
      information: event.information,
      tagIds: event.tags.map((tag: any) => tag.id.toString()),
      ages: ages,
      image: event.image,
      slots: event.slots.map((slot: any) => ({
        ...slot,
        startTime: new Date(slot.startTime),
        endTime: new Date(slot.endTime),
      })),
      highlighted: event.highlighted
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

  if (event && organisation && event.organisationId !== organisation.id) {
    return <Redirect to="/events" />;
  }

  return (
    <main className="component-main">
      <h3>Activiteit bewerken</h3>
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
            themes={config.themes}
          />
        )}
      </Formik>
      {submitError ? (
        <ErrorBanner>
          Oeps! We konden je activiteit niet opslaan: ({submitError.message})
        </ErrorBanner>
      ) : null}
    </main>
  );
}
