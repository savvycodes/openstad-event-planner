import { useEffect, useState } from 'react';
import { useSWRInfinite } from 'swr';
import qs from 'query-string';
import uniqBy from 'lodash.uniqby';

const skip = () => true;

/**
 * Hook that fetches events from api and applies local filters
 */
export function useEvents(filters: any) {
  const [queryString, setQueryString] = useState<string>('');
  const { data, error, size, setSize } = useSWRInfinite(index => {
    if (queryString) {
      return `/event?${queryString}&page=${index + 1}`;
    }
    return `/event?page=${index + 1}`;
  });
  const events = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.records.length <
        data[data.length - 1]?.metadata.pageSize);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  useEffect(() => {
    const apiFilters = {
      ...filters,
      dates: filters?.dates?.map((date: Date) => date.toISOString()) ?? null,
    };
    delete apiFilters.ageRanges;

    // remove empty values
    Object.keys(apiFilters).forEach(key => {
      if (!apiFilters[key]) {
        delete apiFilters[key];
      }
    });

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

    // for each range check if min or max is valid
    const ranges = filter.ageRanges; // ranges = [[16,18],[18,99]]
    return (event: any) => {
      return ranges.some(([rMin, rMax]: number[]) => {
        if (rMax === 99) rMax++;
        return event.minAge >= rMin || rMax > event.minAge;
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

  function next() {
    if (!isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  }

  // Filter locally
  const filteredEvents =
    events
      ?.map((row: any) => row.records)
      .flat()
      ?.filter(filterQuery(filters))
      .filter(filterAge(filters))
      .filter(filterDistrict(filters))
      .filter(filterTags(filters))
      .filter(filterDates(filters)) ?? [];

  return {
    events: uniqBy(filteredEvents, 'id'),
    error,
    loading: !error && !data,
    hasMoreResults: !isReachingEnd,
    next,
  };
}
