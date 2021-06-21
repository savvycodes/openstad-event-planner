import React, { useEffect, useState } from 'react';
import { styled } from 'goober';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import nl from 'date-fns/locale/nl';
import isSameDay from 'date-fns/isSameDay';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';

import { MapPin, ChevronLeft, ChevronRight } from 'react-feather';

import { CardWrapper } from '../card/card';
import { Ages } from '../ages';
import { EventTiles } from './event-tiles';
import { BorderedCardTitle, SmallParagraph } from '../text/text';

interface EventCalendarProps {
  events: any[];
}

const s = {
  Container: styled('div')`
    min-width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 0;
    padding: 0;
    align-items: flex-start;
    justify-content: stretch;
    margin-bottom: 48px;
  `,
  CalendarDay: styled('div')`
    background-color: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.effects.boxShadowPrimary};
    margin: 0 12px;
    min-width: 168px;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
  `,
  CalendarTitle: styled('h2')<any>`
    background-color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.darkGray)};
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    padding: 4px 12px;
    margin: 0;
    padding: 12px;
    box-shadow: ${props => props.theme.effects.boxShadowSecondary};
  `,
  CardContent: styled('div')`
    padding: 0 8px;
    overflow-y: scroll;
  `,
  LocationContainer: styled('div')`
    display: flex;
    align-items: center;
  `,
  Location: styled('a')`
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    font-size: 14px;
  `,
  CardDiv: styled('div')`
    padding: 0 -4px;
  `,
};

/**
 * Calendar view for events, shows a range of 5 days starting from now.
 *
 * Clicking on a day should show all events on that day
 *
 * @todo: Calendar should have
 */
export function EventCalendar({ events }: EventCalendarProps) {
  const [range, setRange] = useState<Date[]>([
    new Date(),
    addDays(new Date(), 1),
    addDays(new Date(), 2),
    addDays(new Date(), 3),
    addDays(new Date(), 4),
  ]);
  const [activeDay, setActiveDay] = useState<Date | null>(null);
  const [eventsGroupedByDay, setEventsGroupedByDay] = useState<any>(events);

  const activeDate = activeDay
    ? formatISO(activeDay, { representation: 'date' })
    : null;
  const eventsOnActiveDay = activeDate ? eventsGroupedByDay[activeDate] : [];

  /**
   * Group events by day when `range` or `events` change
   */
  useEffect(() => {
    setEventsGroupedByDay(
      events.reduce((acc, event) => {
        event.slots
          .map((slot: any) => {
            slot.startTime = new Date(slot.startTime);
            slot.endTime = new Date(slot.endTime);

            return slot;
          })
          .forEach((slot: any) => {
            const day = formatISO(slot.startTime, { representation: 'date' });
            acc[day] = acc[day] || [];
            acc[day].push(event);
          });

        return acc;
      }, {})
    );
  }, [range, events]);

  /**
   * Update the selected day when it is getting out of the date range
   */
  useEffect(() => {
    if (!activeDay) return;

    const first = range[0];
    const last = range[range.length - 1];

    if (isAfter(activeDay, last)) {
      setActiveDay(last);
    } else if (isBefore(activeDay, first)) {
      setActiveDay(first);
    }
  }, [range, activeDay]);

  /**
   * Add a new day to end of range and remove first day of range
   */
  function next() {
    const currentRange = [...range];
    // remove date from beginning of range
    currentRange.splice(0, 1);
    const lastDate = currentRange[currentRange.length - 1];
    // push new date to end of range
    currentRange.push(addDays(lastDate, 1));
    setRange(currentRange);
  }

  /**
   * Add a new day to beginning of range and remove last day of range
   */
  function previous() {
    const currentRange = [...range];
    // remove date from end of range
    currentRange.splice(currentRange.length - 1, 1);
    const firstDate = currentRange[0];
    // push new date to beginning of range
    currentRange.unshift(subDays(firstDate, 1));
    setRange(currentRange);
  }

  return (
    <div>

      <s.Container>
        <ChevronLeft style={{cursor: 'pointer'}} onClick={previous} size={24} stroke={'black'} />
        
        {range.map((day: Date) => {
          const date = formatISO(day, { representation: 'date' });
          const eventsByDay = eventsGroupedByDay[date] || [];
          
          return (
            <s.CalendarDay key={date}>
              <s.CalendarTitle
                onClick={() => setActiveDay(day)}
                active={activeDay && isSameDay(activeDay, day)}
              >
                {format(day, 'cccc d LLLL', { locale: nl })}
              </s.CalendarTitle>


<s.CardContent>
              {eventsByDay.map((event: any) => {
                const slot = event.slots.find((slot: any) =>
                  isSameDay(day, slot.startTime)
                );

                if (!slot) return null;

                return (
                  <s.CardDiv key={event.id}>
                    <BorderedCardTitle title={event.name} />
                    <Ages minAge={event.minAge} maxAge={event.maxAge} />
                    <SmallParagraph>
                      {format(slot.startTime, 'HH:mm')} -{' '}
                      {format(slot.endTime, 'HH:mm')}
                    </SmallParagraph>
                    <s.LocationContainer>
                    <MapPin style={{ padding: '0 4px' }} size={22} stroke={'black'} />
                    <s.Location href="#">Locatie</s.Location>
                    </s.LocationContainer>
                  </s.CardDiv>
                );
              })}
              </s.CardContent>
            </s.CalendarDay>
          );
        })}
        <ChevronRight style={{cursor: 'pointer'}} onClick={next} size={24} stroke={'black'} />
      </s.Container>

      
      <CardWrapper>
      {eventsOnActiveDay ? (
          <EventTiles events={eventsOnActiveDay} />
          ) : null}
          </CardWrapper>
    </div>
  );
}
