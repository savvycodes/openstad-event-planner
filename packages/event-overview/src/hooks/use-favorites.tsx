import useSWR from 'swr';
import { useConfig } from '../context/config-context';
import { useUser } from '../context/user-context';

/**
 * Hook that fetches favorites
 */
export function useFavorites() {
  const { apiUrl, siteId } = useConfig();
  const { jwt } = useUser();
  const { data, error, mutate } = useSWR(`/event/favorites`);

  /**
   * Mark an event as favorite
   * @param eventId
   */
  async function favorite(event: any) {
    const res = await fetch(
      `${apiUrl}/api/site/${siteId}/event/${event.id}/favorite`,
      {
        method: 'POST',
        headers: {
          'X-Authorization': `Bearer ${jwt}`,
        },
      }
    );
    if (res.ok) {
      mutate(data.concat([event]));
    }
  }

  /**
   * Remove an event as favorite
   * @param eventId
   */
  async function unfavorite(eventId: number) {
    const res = await fetch(
      `${apiUrl}/api/site/${siteId}/event/${eventId}/favorite`,
      {
        method: 'DELETE',
        headers: {
          'X-Authorization': `Bearer ${jwt}`,
        },
      }
    );
    if (res.ok) {
      // remove event from data array
      mutate([].concat(data).filter((event: any) => event.id !== eventId));
    }
  }

  function isFavorite(eventId: any) {
    return data.some((event: any) => event.id === eventId);
  }

  return { data, error, favorite, unfavorite, isFavorite };
}
