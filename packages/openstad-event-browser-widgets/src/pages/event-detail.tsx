import React from 'react';
import useSWR from 'swr';
import { RouteComponentProps } from 'wouter';
import { MapPin } from 'react-feather';

import { ErrorBanner } from '../components/error-banner';
import { Spinner } from '../components/spinner';
import { Paragraph, RichText } from '../components/text/text';
import { formatAges } from '../components/ages';
import { Location } from '../components/location';

import '../styles/event.css'



export function EventDetailPage({ params }: RouteComponentProps) {
  const { data: event, error } = useSWR(() => '/event/' + params.id);

  if (error)
    return <ErrorBanner>Er ging iets fout: ({error.message})</ErrorBanner>;
  if (!event) return <Spinner />;

  interface Props {
    start: any;
    end: any;
    slot: any;
  }

  const AvailablePlaces: React.FC<Props> = ({ start, end, slot }) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    return (
      <div key={slot.id}>
        <p>
          {start.toLocaleDateString('nl-NL', options)}{' '}
          {start.toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          <p>tot</p>{' '}
          {end.toLocaleDateString('nl-NL', options)}{' '}
          {end.toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    );
  };

  return (
    <div className="events-event-container">
      <div className="events-event-container__layout">
        <div className="events-event-container__information">
          <h2>{event.name}</h2>
          <p>door: {event.organisation.name}</p>

          <div className="events-tags-container">
            <p className="events-tag">
              {formatAges(event.minAge, event.maxAge)}
            </p>
            <p className="events-tag">{event.district}</p>
            {event.tags.map((tag: any) => {
              return <p className="events-tag">{tag.name}</p>;
            })}
          </div>
          <div className="events-event__information">
            <h3>Beschrijving activiteit</h3>
            <RichText className="events-event__information-description" text={event.description} />
          </div>

          <div className="events-event__information">
            <h3>Kosten deelname</h3>
            <Paragraph>{event.price}</Paragraph>
          </div>

          {event.information && event.information.length ? (
            <div className="events-event__information">
              <h3>Hoe kan je je aanmelden?</h3>
              <RichText text={event.information} />
            </div>
          ) : null}
          <div className="events-event__information">
          <h3>Wanneer?</h3>
          {event.slots.map((slot: any) => {
              const start = new Date(slot.startTime);
              const end = new Date(slot.endTime);
              return <AvailablePlaces end={end} start={start} slot={slot} />;
            })}
          </div>
          
          <div className="events-event__information">
          <h3>Locatie</h3>
          <div className="events-event__information-location">
              <MapPin size={24} />
              <p>
                <Location
                  lat={event.location.coordinates[1]}
                  lon={event.location.coordinates[0]}
                />
              </p>
            </div>
          </div>
        </div>
        <img className="events-event__information-image" src={event.image} alt={event.name} />
      </div>
    </div>
  );
}
