import { AppConfig } from '../app';

/**
 * Creates a data fetcher for SWR
 * @param config
 * @param resource
 * @param init
 * @returns
 */
export function createFetcher(config: AppConfig, resource: string, init: any) {
  init = init || {};
  const headers: any = {};
  if (config.jwt) {
    headers['X-Authorization'] = 'Bearer ' + config.jwt;
  }

  init.headers = {
    ...init.headers,
    ...headers,
  };

  return fetch(
    `${config.apiUrl}/api/site/${config.siteId}${resource}`,
    init
  ).then(res => res.json());
}
