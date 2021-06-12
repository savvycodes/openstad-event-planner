import { AppConfig } from '../app';

type EventInput = {
  name: string;
  description: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  district: string;
  price: number;
  attendees: number;
  information: string;
  image: string;
  tagIds: number[];
  minAge: number;
  maxAge: number;
  slots: EventSlotInput[];
};

type EventSlotInput = {
  startTime: Date;
  endTime: Date;
};

type EventResponse = {
  id: number;
  siteId: number;
  name: string;
  description: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  district: string;
  minAge: number;
  maxAge: number;
  price: number;
  attendees: number;
  information: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  organisationId: number;
  slots: [
    {
      id: number;
      startTime: string;
      endTime: string;
      createdAt: string;
      updatedAt: string;
      deletedAt?: string;
      eventId: number;
    }
  ];
  organisation: any;
  tags: any;
};

type EventResponseError = {
  message: string;
  error: string;
};

export async function createEvent(config: AppConfig, payload: EventInput) {
  const res = await fetch(`${config.apiUrl}/api/site/${config.siteId}/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${config.jwt}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status >= 400) {
    const error: EventResponseError = await res.json();
    throw new Error(
      `Kon activiteit niet opslaan: ${res.status} ${error.message}`
    );
  }

  const data: EventResponse = await res.json();
  return data;
}

export async function removeEvent(config: AppConfig, id: number) {
  const res = await fetch(
    `${config.apiUrl}/api/site/${config.siteId}/event/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${config.jwt}`,
      },
    }
  );

  if (res.status >= 400) {
    const error: EventResponseError = await res.json();
    throw new Error(
      `Kon activiteit niet verwijderen: ${res.status} ${error.message}`
    );
  }

  return null;
}
