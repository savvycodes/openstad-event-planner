import React from 'react';
import { Link } from 'wouter';
import format from 'date-fns/format';
import nl from 'date-fns/locale/nl';

import { ActivityImage, HeartIcon } from '../card/card';

import { useUser } from '../../context/user-context';
import { useFavorites } from '../../hooks/use-favorites';
import { useConfig } from '../../context/config-context';
import { styled } from 'goober';
import { Sun } from 'react-feather';

export const ActivityCardPinContainer = styled('div')`
  min-width: 1rem;
  min-height: 1rem;
  padding: 0.5rem;
  top: 0;
  left: 0;
  z-index: 1;
  position: absolute;
`;

export function EventTiles({ events }: any) {
  const user = useUser();
  const config = useConfig();
  const { isFavorite, unfavorite, favorite } = useFavorites();
  const slug = config.slug ?? '';
  const prefixUrl = config.prefixUrl ?? '';
  return events.map((event: any) => (
    <Link href={`${prefixUrl}${slug}/${event.id}`} key={event.id}>
      <div className="events-activity-card">
        {event.highlighted ? (
          <ActivityCardPinContainer>
            <Sun size={24} stroke={'#F39200'} />
          </ActivityCardPinContainer>
        ) : null}

        <div
          className="events-icon-button"
          onClick={(e) => {
            e.stopPropagation();
            if (user.isLoggedIn()) {
              if (isFavorite(event.id)) {
                unfavorite(event.id);
              } else {
                favorite(event);
              }
            } else {
              alert('Je moet ingelogd zijn om deze als favoriet op te slaan');
            }
          }}
        >
          <div className="events-icon-button__container">
            <HeartIcon size={24} active={isFavorite(event.id)} />
          </div>
        </div>

        <div className="events-activity-card__image-wrapper">
          <ActivityImage
            className="events-activity-card__image"
            src={event.image + '/:/rs=w:666'}
            alt={event.name}
            loading="lazy"
          />
          <div className="events-tags-container events-tags-container__card">
            {event?.tags.map((tag: any) => (
              <p className="events-tag events-tag__category" key={tag.id}>
                {tag.name}
              </p>
            ))}
            <p className="events-tag events-tag__district">{event.district}</p>
          </div>
        </div>
        <div className="events-activity-card__text">
          <h3 className="events-activity-card__text-title">{event.name}</h3>
          <p className="events-activity-card__date">
            {event.slots.length > 1
              ? `Meerdere dagen (${event.slots.length})`
              : format(new Date(event.slots[0].startTime), 'd LLLL', {
                  locale: nl,
                })}
          </p>
          {/* <p className="events-activity-card__text-organisation">
            Aanbieder: {event.organisation.name}
          </p> */}
          <p className="events-activity-card__text-description">
            {event.description.replace(/(<([^>]+)>)/gi, '').slice(0, 80)}
            {event.description.length > 80 ? '...' : null}
          </p>
          <a href="" className="events-activity-card__link">
            Activiteit bekijken
          </a>
        </div>
      </div>
    </Link>
  ));
}
