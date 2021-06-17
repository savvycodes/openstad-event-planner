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

import { ActivityCard, CardWrapper } from '../card/card';
import { Ages } from '../ages';
import { EventTiles } from './event-tiles';
import { DFlex } from '../layout/layout';

interface EventCalendarProps {
  events: any[];
}

const s = {
  DFlex: styled(DFlex)`
    width: 100%;
  `,
  CalendarDay: styled('div')`
    flex-grow: 1;
    width: 100%;
  `,
  CalendarTitle: styled('h2')<any>`
    background-color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.darkGray)};
    font-size: 16px;
    text-align: center;
    margin: 0;
    padding: 4px 12px;
  `,
  ActivityCard: styled(ActivityCard)`
    background-color: yellow;
    margin: 0;
  `,
  CardDiv: styled('div')`
    margin: 0;
    padding: 0;
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
      <button onClick={previous}>Previous</button>
      <button onClick={next}>Next</button>

      <s.DFlex>
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


<s.ActivityCard>
              {eventsByDay.map((event: any) => {
                const slot = event.slots.find((slot: any) =>
                  isSameDay(day, slot.startTime)
                );

                if (!slot) return null;

                return (
                  <s.CardDiv key={event.id}>
                    <h3>{event.name}</h3>
                    <p>
                      {format(slot.startTime, 'HH:mm')} -{' '}
                      {format(slot.endTime, 'HH:mm')}
                    </p>
                    <Ages minAge={event.minAge} maxAge={event.maxAge} />
                    <a href="#">Locatie</a>
                  </s.CardDiv>
                );
              })}
              </s.ActivityCard>
            </s.CalendarDay>
          );
        })}
      </s.DFlex>

      {eventsOnActiveDay ? (
        <CardWrapper>
          <EventTiles events={eventsOnActiveDay} />
        </CardWrapper>
      ) : null}
    </div>
  );
}
