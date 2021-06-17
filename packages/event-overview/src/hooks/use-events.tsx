import { useEffect, useState } from 'react';
import useSWR from 'swr';
import qs from 'query-string';

const skip = () => true;

/**
 * Hook that fetches events from api and applies local filters
 */
export function useEvents(filters: any) {
  const [queryString, setQueryString] = useState<string>('');
  const { data, error } = useSWR(() => `/event?${queryString}`);

  useEffect(() => {
    const apiFilters = {
      ...filters,
      dates: filters?.dates?.map((date: Date) => date.toISOString()) ?? null,
    };
    delete apiFilters.ageRanges;

    setQueryString(qs.stringify(apiFilters));
  }, [filters]);

  function filterQuery(filter: any) {
    if (!filter?.q) {
      return skip;
    }

    const fields = ['name', 'description'];
    return (event: any) =>
      fields
        .map(field => event[field].toLowerCase())
        .join(' ')
        .includes(filter.q.toLowerCase());
  }

  function filterAge(filter: any) {
    if (!filter?.ageRanges?.length) {
      return skip;
    }

    const ranges = filter.ageRanges;
    return (event: any) => {
      return ranges.some(([rMin, rMax]: number[]) => {
        if (rMax === 99) rMax++;
        return event.minAge >= rMin && rMax > event.minAge;
      });
    };
  }

  function filterDistrict(filter: any) {
    if (!filter?.districts?.length) {
      return skip;
    }

    return (event: any) => filter.districts.includes(event.district);
  }

  function filterTags(filter: any) {
    if (!filter?.tagIds?.length) {
      return skip;
    }
    return (event: any) =>
      filter.tagIds.some((tagId: number) =>
        event.tags.map((tag: any) => tag.id).includes(tagId)
      );
  }

  function filterDates(filter: any) {
    if (!filter?.dates.length) {
      return skip;
    }

    return (event: any) => {
      const dates = event.slots.map((slot: any) => new Date(slot.startTime));
      return dates.some((date: Date) =>
        filter.dates.some(
          ($date: Date) => date.toDateString() === $date.toDateString()
        )
      );
    };
  }

  // Filter locally
  const filteredEvents =
    data?.records
      ?.filter(filterQuery(filters))
      .filter(filterAge(filters))
      .filter(filterDistrict(filters))
      .filter(filterTags(filters))
      .filter(filterDates(filters)) ?? [];

  return { events: filteredEvents, error, loading: !error && !data };
}
