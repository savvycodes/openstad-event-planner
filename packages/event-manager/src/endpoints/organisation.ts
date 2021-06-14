import { AppConfig } from '../app';

function removeEmptyKeys(payload: any) {
  // Remove empty keys from payload
  Object.keys(payload).map(key => {
    if (payload[key] === null || !payload[key].length) {
      delete payload[key];
    }
  });
}

export async function createOrganisation(config: AppConfig, payload: any) {
  removeEmptyKeys(payload);

  const res = await fetch(
    `${config.apiUrl}/api/site/${config.siteId}/organisation`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${config.jwt}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return res;
}

export async function updateOrganisation(
  config: AppConfig,
  id: any,
  payload: any
) {
  removeEmptyKeys(payload);

  const res = await fetch(
    `${config.apiUrl}/api/site/${config.siteId}/organisation/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${config.jwt}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return res;
}
