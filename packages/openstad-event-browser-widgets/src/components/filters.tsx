import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Calendar } from 'react-multi-date-picker';
import { ChevronDown, ChevronUp, Search } from 'react-feather';
import { useMediaQuery } from 'react-responsive';

import { Spinner } from './spinner';

import { useDistricts } from '../hooks/use-districts';
import useDebounce from '../hooks/use-debounce';
import { useConfig } from '../context/config-context';
import '../styles/filters.css';

function Filter({ name, children }: any) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="event-filter-wrapper">
      <div className="event-filter">
        <p onClick={() => setOpen(!isOpen)}>{name}</p>
        {isOpen ? (
          <ChevronUp
            className="event-filter__icon"
            onClick={() => setOpen(!isOpen)}
            size={24}
            strokeWidth={2}
            stroke={'#0D0D0D'}
          />
        ) : (
          <ChevronDown
            className="event-filter__icon"
            onClick={() => setOpen(!isOpen)}
            size={24}
            strokeWidth={2}
            stroke={'#0D0D0D'}
          />
        )}
      </div>
      {isOpen ? children : null}
    </div>
  );
}

const initialFilters: any = {
  q: '',
  tagIds: [],
  districts: [],
  dates: [],
};

export function FilterSidebar({ onChange, ...props }: any) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const { themes } = useConfig();

  const { data: tags } = useSWR('/tag');
  const districts = useDistricts();
  // const ages = ['0-4', '4-8', '8-12', '12-16', '16-18', '18-99'];

  const [filtersVisible, setFiltersVisible] = useState(
    isDesktopOrLaptop ? true : false
  );

  const [filters, setFilters] = useState(props.filters || initialFilters);
  const [query, setQuery] = useState(filters.q);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setFilters((filters: any) => ({
      ...filters,
      q: debouncedQuery,
    }));
  }, [debouncedQuery]);

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  if (!tags) {
    return <Spinner />;
  }

  return (
    <div className="events-filters">
      <>
        <div className="event-input-wrapper event-input-wrapper__has-icon">
          <input
            className="event-input-wrapper__input"
            placeholder="Trefwoord"
            value={query}
            onChange={(e: { target: { value: string } }) =>
              setQuery(e.target.value)
            }
          />
          <Search
            className="event-input-wrapper__icon"
            size={24}
            strokeWidth={2}
            stroke={'#0D0D0D'}
          />
        </div>

        {isTabletOrMobile && (
          <button
            className="filter-event-button"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            Filteren
          </button>
        )}
      </>
      {filtersVisible && (
        <>
          <Filter className="event-filter" name="Stadsdeel">
            {districts.map((district: any, index: any) => (
              <label className="event-filter__label" key={index}>
                <input
                  className="event-filter__input"
                  type="checkbox"
                  checked={filters.districts.includes(district)}
                  onChange={(e) => {
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
                          (d) => d !== district
                        ),
                      });
                    }
                  }}
                />
                <p style={{ display: 'inline-block' }}>{district}</p>
              </label>
            ))}
          </Filter>
          {themes?.map((theme: any, themeIndex: any) => (
            <Filter name={theme.label || theme.value} key={themeIndex}>
              {tags
                .filter((tag: any) => tag.extraData.theme === theme.value)
                .map((tag: any) => (
                  <label className="event-filter__label" key={tag.id}>
                    <input
                      className="event-filter__input"
                      type="checkbox"
                      checked={
                        filters.tagIds[themeIndex] &&
                        filters.tagIds[themeIndex].includes(tag.id)
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const tagIds = [...filters.tagIds];
                        const themeTags = tagIds[themeIndex] || [];

                        if (checked) {
                          //   add
                          tagIds[themeIndex] = [...themeTags, tag.id];
                        } else {
                          //   remove
                          tagIds[themeIndex] = [...themeTags].filter(
                            (tId) => tId !== tag.id
                          );
                        }

                        setFilters({
                          ...filters,
                          tagIds: tagIds.map((x) => {
                            if (x) {
                              return x;
                            }
                            return [];
                          }), // .filter((x: any) => x),
                        });
                      }}
                    />
                    <p style={{ display: 'inline-block' }}>{tag.name}</p>
                  </label>
                ))}
            </Filter>
          ))}
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
        </>
      )}
    </div>
  );
}
