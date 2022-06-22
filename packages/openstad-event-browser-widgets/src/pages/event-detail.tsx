import React, { useState } from 'react';
import useSWR from 'swr';
import { RouteComponentProps, useLocation } from 'wouter';
import { MapPin } from 'react-feather';
import { Helmet } from 'react-helmet';

import { ErrorBanner } from '../components/error-banner';
import { Spinner } from '../components/spinner';
import { RichText } from '../components/text/text';
import { Location } from '../components/location';
import Guard from '../components/guard';

import { removeEvent } from '../endpoints/event';
import { useConfig } from '../context/config-context';

import '../styles/event.css';

interface Props {
  start: any;
  end: any;
  slot: any;
}

const AvailablePlaces: React.FC<Props> = ({ start, end, slot }) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };

  return (
    <ul className="events-when" key={slot.id}>
      <li className="event-when">
        {start.toLocaleDateString('nl-NL', options)}{' '}
        {start.toLocaleTimeString('nl-NL', {
          hour: '2-digit',
          minute: '2-digit',
        })}{' '}
        tot {end.toLocaleDateString('nl-NL', options)}{' '}
        {end.toLocaleTimeString('nl-NL', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </li>
    </ul>
  );
};

export function EventDetailPage({ params }: RouteComponentProps) {
  const { data: event, error } = useSWR(() => '/event/' + params.id);
  const config = useConfig();
  const [, navigate] = useLocation();

  const [isRemoving, setRemoving] = useState(false);

  async function onRemove(id: any) {
    const shouldRemove = confirm(
      'Weet u zeker dat u deze activiteit wilt verwijderen?'
    );

    if (!shouldRemove) return;
    setRemoving(true);

    try {
      await removeEvent(config, id);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      alert(`Kon activiteit niet verwijderen (${err.message})`);
    } finally {
      setRemoving(false);
    }
  }

  if (error)
    return <ErrorBanner>Er ging iets fout: ({error.message})</ErrorBanner>;
  if (!event) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>{event.name}</title>
      </Helmet>
      <div className="events-event-container">
        <div className="events-event-container__layout">
          <div className="events-event-container__information">
            <h2>{event.name}</h2>
            <p className="events-activity-card__text-organisation">
              Aanbieder: {event.organisation.name}
            </p>

            <div className="events-tags-container">
              <p className="events-tag">{event.district}</p>
              {event.tags.map((tag: any) => {
                return <p className="events-tag">{tag.name}</p>;
              })}
            </div>
            <div className="events-event__information">
              <h3>Beschrijving activiteit</h3>
              <RichText
                className="events-event__information-description"
                text={event.description}
              />
            </div>

            <div className="events-event__information">
              <h3>Kosten deelname</h3>
              <p>{event.price}</p>
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
          <img
            className="events-event__information-image"
            src={event.image}
            alt={event.name}
          />
          <Guard
            role={['admin', 'editor', 'moderator']}
            render={() => (
              <>
                <a
                  href={`${config.providerPageUrl}/admin/events/${event.id}/edit`}
                >
                  Bewerken
                </a>
                <button
                  disabled={isRemoving}
                  onClick={() => onRemove(event.id)}
                >
                  Verwijderen
                </button>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
}
