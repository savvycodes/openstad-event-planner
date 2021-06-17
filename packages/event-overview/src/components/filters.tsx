import React, { useEffect, useState } from 'react';
import { styled } from 'goober';
import useSWR from 'swr';
import { Calendar } from 'react-multi-date-picker';
import { ChevronDown, ChevronUp } from 'react-feather';

import { Spinner } from './spinner';

import { useDistricts } from '@hooks/use-districts';
import useDebounce from '@hooks/use-debounce';

const styles = {
  Filter: styled(Filter)`
    padding: 100px;
  `,
  Container: styled('div')`
    margin: 0 48px;
  `,
  Input: styled('input')``,
};

function Filter({ name, children }: any) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <h2 onClick={() => setOpen(!isOpen)}>
        {name}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </h2>
      {isOpen ? children : null}
    </>
  );
}

const initialFilters: any = {
  q: '',
  ageRanges: [],
  tagIds: [],
  districts: [],
  dates: [],
};

export function FilterSidebar({ onChange, ...props }: any) {
  const { data: tags } = useSWR('/tag');
  const districts = useDistricts();
  const ages = ['0-4', '4-8', '8-12', '12-16', '16-18', '18-99'];

  const [filters, setFilters] = useState(props.filters || initialFilters);
  const [query, setQuery] = useState(filters.q);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setFilters({
      ...filters,
      q: debouncedQuery,
    });
  }, [debouncedQuery]);

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  useEffect(() => {
    onChange(filters);
  }, []);

  if (!tags) {
    return <Spinner />;
  }

  return (
    <styles.Container>
      <styles.Input
        placeholder="Trefwoord"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <styles.Filter name="Leeftijd">
        {ages.map((group: string, index) => {
          const range = group.split('-').map(a => parseInt(a));

          return (
            <label style={{ display: 'block' }} key={index}>
              <input
                type="checkbox"
                checked={filters.ageRanges.some(
                  ([min, max]: any) => min === range[0] && max === range[1]
                )}
                onChange={e => {
                  const checked = e.target.checked;

                  if (checked) {
                    //   add
                    setFilters({
                      ...filters,
                      ageRanges: [...filters.ageRanges, range],
                    });
                  } else {
                    //   remove
                    setFilters({
                      ...filters,
                      ageRanges: [...filters.ageRanges].filter(([min, max]) => {
                        if (min === range[0] && max === range[1]) {
                          return false;
                        }
                        return true;
                      }),
                    });
                  }
                }}
              />
              <p style={{ display: 'inline-block' }}>{group} jaar</p>
            </label>
          );
        })}
      </styles.Filter>
      <Filter name="Stadsdeel">
        {districts.map((district: any, index) => (
          <label style={{ display: 'block' }} key={index}>
            <input
              type="checkbox"
              checked={filters.districts.includes(district)}
              onChange={e => {
                const checked = e.target.checked;
                if (checked) {
                  //   add
                  setFilters({
                    ...filters,
                    districts: [...filters.districts, district],
                  });
                } else {
                  //   remove
                  setFilters({
                    ...filters,
                    districts: [...filters.districts].filter(
                      d => d !== district
                    ),
                  });
                }
              }}
            />
            <p style={{ display: 'inline-block' }}>{district}</p>
          </label>
        ))}
      </Filter>
      <Filter name="Tags">
        {tags.map((tag: any) => (
          <label style={{ display: 'block' }} key={tag.id}>
            <input
              type="checkbox"
              checked={filters.tagIds.includes(tag.id)}
              onChange={e => {
                const checked = e.target.checked;
                if (checked) {
                  //   add
                  setFilters({
                    ...filters,
                    tagIds: [...filters.tagIds, tag.id],
                  });
                } else {
                  //   remove
                  setFilters({
                    ...filters,
                    tagIds: [...filters.tagIds].filter(tId => tId !== tag.id),
                  });
                }
              }}
            />
            <p style={{ display: 'inline-block' }}>{tag.name}</p>
          </label>
        ))}
      </Filter>
      <Calendar
        minDate={new Date()}
        multiple
        value={filters.dates}
        onChange={(dates: any) =>
          setFilters({
            ...filters,
            dates: dates.map((d: any) => new Date(d)),
          })
        }
      />
      <button onClick={() => setFilters(initialFilters)}>Wissen</button>
    </styles.Container>
  );
}
