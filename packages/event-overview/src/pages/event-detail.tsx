import React from 'react';
import useSWR from 'swr';
import { RouteComponentProps } from 'wouter';

import { ErrorBanner } from '../components/error-banner';
import { Spinner } from '../components/spinner';

export function EventDetailPage({ params }: RouteComponentProps) {
  const { data: event, error } = useSWR(() => '/event/' + params.id);

  if (error)
    return <ErrorBanner>Er ging iets fout: ({error.message})</ErrorBanner>;
  if (!event) return <Spinner />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>{event.name}</h1>
      <img src={event.image} alt={event.name} />
      <p>{event.description}</p>
      {event.slots.map((slot: any) => {
        const start = new Date(slot.startTime);
        const end = new Date(slot.endTime);
        return (
          <div key={slot.id}>
            <p>
              {start.toLocaleDateString('nl-NL')}{' '}
              {start.toLocaleTimeString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              -{' '}
              {end.toLocaleTimeString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
}
