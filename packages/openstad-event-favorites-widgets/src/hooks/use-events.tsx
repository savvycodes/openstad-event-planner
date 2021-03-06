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
      data[data.length - 1]?.metadata.page ===
        data[data.length - 1]?.metadata.pageCount);
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
    delete apiFilters.favorites;

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

    const groups = [
      [0, 4],
      [4, 8],
      [8, 12],
      [12, 16],
      [16, 18],
      [18, 99],
    ];
    const ranges = filter.ageRanges;
    return (event: any) => {
      event.ranges = groups.filter(
        ([min, max]) => event.minAge <= min && event.maxAge >= max
      );

      // check if any of the selected ranges is inside event.ranges
      return event.ranges.some(([eMin, eMax]: number[]) =>
        ranges.some(([rMin, rMax]: number[]) => eMin === rMin && eMax === rMax)
      );
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
    if (!filter.dates || !filter?.dates.length) {
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

  function filterFavorites(filter: any) {
    if (!filter || !filter?.favorites || !filter.favorites.length) {
      return skip;
    }

    return (event: any) => {
      return !filter.favorites.includes(event.id);
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
      .filter(filterDates(filters))
      .filter(filterFavorites(filters)) ?? [];

  return {
    events: uniqBy(filteredEvents, 'id'),
    error,
    loading: !error && !data,
    hasMoreResults: !isReachingEnd,
    next,
  };
}
