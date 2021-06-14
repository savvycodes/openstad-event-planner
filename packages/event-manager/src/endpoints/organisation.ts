import { AppConfig } from '../app';

export async function createOrganisation(config: AppConfig, payload: any) {
  // Remove empty keys from payload
  Object.keys(payload).forEach(key => {
    if (payload[key] === null) {
      delete payload[key];
    }
  });

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
