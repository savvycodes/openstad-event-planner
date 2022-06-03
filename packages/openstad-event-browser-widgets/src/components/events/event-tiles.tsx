import React from 'react';
import { Link } from 'wouter';

import {
  ActivityImage,
  HeartIcon,
} from '../card/card';
import { formatAges } from '../ages';
import { useUser } from '../../context/user-context';
// import { useConfig } from '../../context/config-context';
import { useFavorites } from '../../hooks/use-favorites';

export function EventTiles({ events }: any) {
  const user = useUser();
  // const config = useConfig();
  const { isFavorite, unfavorite, favorite } = useFavorites();

  return events.map((event: any) => (
    <Link to={`/${event.id}`} key={event.id}>
      <div className="events-activity-card">
        <div
          className="events-icon-button"
          onClick={e => {
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
            <HeartIcon active={isFavorite(event.id)} />
          </div>
        </div>
        <div className="events-activity-card__image-wrapper">
          <ActivityImage className="events-activity-card__image"
            src={event.image + '/:/rs=w:666'}
            alt={event.name}
            loading="lazy"
          />
          <div className="events-tags-container">
            <p className="events-tags-container">{formatAges(event.minAge, event.maxAge)}</p>
            {event?.tags.map((tag: any) => (
              <p className="events-tags-container" key={tag.id}>{tag.name}</p>
            ))}
            <p className="events-tags-container">{event.district}</p>
          </div>
        </div>
        <div className="events-activity-card__text">
          <h3 className="events-activity-card__text-title">{event.name}</h3>
          <p className="events-activity-card__text-organisation">
            Door: {event.organisation.name}
          </p>
          <p className="events-activity-card__text-description">
            {event.description.replace(/(<([^>]+)>)/gi, '')}
          </p>
        </div>
      </div>
    </Link>
  ));
}
