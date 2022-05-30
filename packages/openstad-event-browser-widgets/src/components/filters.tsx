import React, { useEffect, useState } from 'react';
import { styled } from 'goober';
import useSWR from 'swr';
import { Calendar } from 'react-multi-date-picker';
import { ChevronDown, ChevronUp, Search } from 'react-feather';
import { useMediaQuery } from 'react-responsive';

import { Spinner } from './spinner';
import { Ages } from './ages';
import { Filter as FilterIcon } from 'react-feather';

import { useDistricts } from '../hooks/use-districts';
import useDebounce from '../hooks/use-debounce';
import { StyledInput } from './forms/input';
import { Button } from './button/button';
import { Paragraph } from './text/text';
import { DFlex } from './layout/layout';
import { useConfig } from '../context/config-context';

const styles = {
  Ages: styled(Ages)`
    padding: 0 8px;
  `,
  P: styled(Paragraph)`
    padding: 0 8px;
  `,
  Filter: styled(Filter)`
    padding: 100px;
  `,
  Container: styled('div')`
    @media (min-width: 1024px) {
      margin: 0 42px;
    }
    @media (max-width: 1023px) {
      margin: 0 12px;
    }
  `,
  InputWithIcon: styled('div')`
    display: flex;
    align-items: center;
    margin: 24px 0;
    width: 100%;
  `,
  StyledInput: styled(StyledInput)`
    margin: 0;
    width: 100%;
  `,
  Search: styled(Search)`
    background-color: ${(props) => props.theme.colors.background};
    height: 40px;
    width: 40px;
    padding: 11px;
    box-shadow: ${(props) => props.theme.effects.boxShadowSecondary};
  `,
  ChevronUp: styled(ChevronUp)`
    background-color: ${(props) => props.theme.colors.background};
    height: 40px;
    width: 40px;
    padding: 10px;
    box-shadow: ${(props) => props.theme.effects.boxShadowSecondary};
  `,
  ChevronDown: styled(ChevronDown)`
    background-color: ${(props) => props.theme.colors.background};
    height: 40px;
    width: 40px;
    padding: 10px;
    box-shadow: ${(props) => props.theme.effects.boxShadowSecondary};
  `,

  FilterItemName: styled('h2')`
    background-color: ${(props) => props.theme.colors.white};
    width: 100%;
    padding: 12px;
    box-shadow: ${(props) => props.theme.effects.boxShadowPrimary};
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  `,
  Button: styled(Button)`
    margin: 24px 0;
    padding: 8px 16px;
    font-size: 14px;
  `,
  DFlex: styled(DFlex)`
    align-items: center;
    justify-content: space-between;
  `,

  FilterButton: styled('div')`
    background-color: ${(props) => props.theme.colors.background};
    box-shadow: ${(props) => props.theme.effects.boxShadowSecondary};
    padding: 8px;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  FilterIcon: styled(FilterIcon)`
    padding: 0 4px;
  `,
};

function Filter({ name, children }: any) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <styles.InputWithIcon>
        <styles.FilterItemName onClick={() => setOpen(!isOpen)}>
          {name}
        </styles.FilterItemName>
        {isOpen ? (
          <styles.ChevronUp
            onClick={() => setOpen(!isOpen)}
            size={24}
            strokeWidth={3}
            stroke={'#0D0D0D'}
          />
        ) : (
          <styles.ChevronDown
            onClick={() => setOpen(!isOpen)}
            size={24}
            strokeWidth={3}
            stroke={'#0D0D0D'}
          />
        )}
      </styles.InputWithIcon>
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
    <styles.Container>
      <styles.DFlex>
        <styles.InputWithIcon>
          <styles.StyledInput
            placeholder="Trefwoord"
            value={query}
            onChange={(e: { target: { value: string } }) =>
              setQuery(e.target.value)
            }
          />
          <styles.Search size={24} strokeWidth={3} stroke={'#0D0D0D'} />
        </styles.InputWithIcon>

        {isTabletOrMobile && (
          <styles.FilterButton
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <styles.FilterIcon size={24} stroke={'black'} />
            Filteren
          </styles.FilterButton>
        )}
      </styles.DFlex>
      {filtersVisible && (
        <>
          <Filter name="Stadsdeel">
            {districts.map((district: any, index: any) => (
              <label style={{ display: 'block' }} key={index}>
                <input
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
                <styles.P style={{ display: 'inline-block' }}>
                  {district}
                </styles.P>
              </label>
            ))}
          </Filter>
          {themes?.map((theme: any) => (
            <Filter name={theme.value}>
              {tags
                .filter((tag: any) => tag.extraData.theme === theme.value)
                .map((tag: any) => (
                  <label style={{ display: 'block' }} key={tag.id}>
                    <input
                      type="checkbox"
                      checked={filters.tagIds.includes(tag.id)}
                      onChange={(e) => {
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
                            tagIds: [...filters.tagIds].filter(
                              (tId) => tId !== tag.id
                            ),
                          });
                        }
                      }}
                    />
                    <styles.P style={{ display: 'inline-block' }}>
                      {tag.name}
                    </styles.P>
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
          <styles.Button onClick={() => setFilters(initialFilters)}>
            Wissen
          </styles.Button>
        </>
      )}
    </styles.Container>
  );
}
