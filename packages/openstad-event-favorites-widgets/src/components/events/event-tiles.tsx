import React from 'react';

import { ActivityImage, TrashIcon, HeartIcon } from '../card/card';
import { useConfig } from '../../context/config-context';

export function EventTiles({ events, add, onDelete, onFavorite }: any) {
  const { activityDetailPageUrl } = useConfig();

  return events.map((event: any) => (
    <div className="events-activity-card" key={event.id}>
      <div className="events-icon-button">
        {add ? (
          <div className="events-icon-button__container">
            <HeartIcon
              active={false}
              onClick={() => onFavorite && onFavorite(event.id)}
            />
          </div>
        ) : (
          <div className="events-icon-button__container">
            <TrashIcon onClick={() => onDelete && onDelete(event.id)} />
          </div>
        )}
      </div>
      <div className="events-activity-card__image-wrapper">
        <ActivityImage
          src={event.image + '/:/rs=w:666'}
          alt={event.name}
          loading="lazy"
        />
      </div>
      <div className="events-activity-card__text">
        <h3 className="events-activity-card__text-title">{event.name}</h3>

        {event.organisation ? (
          <p className="events-activity-card__text-organisation">
            Door: {event.organisation?.name}
          </p>
        ) : null}
        <p className="events-activity-card__text-description">
          {event.description.replace(/(<([^>]+)>)/gi, '')}
        </p>
        <a
          className="events-activity-card__link"
          href={`${activityDetailPageUrl}/${event.id}`}
        >
          Activiteit bekijken
        </a>
      </div>
    </div>
  ));
}
