import { useConfig } from '../context/config-context';

/**
 * @todo: Make districts configurable.
 */
export function useDistricts() {
  const config = useConfig();
  const areas = config.areas ?? [];

  return areas.map((area: any) => area.value);
}
