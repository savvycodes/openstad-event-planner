import React from 'react';
import useSWR from 'swr';
import { styled } from 'goober';
import { RouteComponentProps } from 'wouter';
import { MapPin } from 'react-feather';

import { ErrorBanner } from '../components/error-banner';
import { Spinner } from '../components/spinner';
import { Border, Paragraph, RichText } from '../components/text/text';
import { CardTag } from '../components/card/card';
import { formatAges } from '../components/ages';
import { Location } from '../components/location';
import { DFlex } from '../components/layout/layout';

const styles = {
  Container: styled('div')`
    @media (min-width: 1024px) {
      background-color: ${props => props.theme.colors.background};
      padding: 48px;
    }
    @media (max-width: 1023px) {
      background-color: ${props => props.theme.colors.background};
      padding: 12px;
    }
  `,
  EventInformation: styled('div')`
    @media (min-width: 1024px) {
      margin: 32px;
    }
    @media (max-width: 1023px) {
      margin-bottom: 24px;
    }
  `,

  EventDetails: styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `,

  Title: styled('h1')`
    @media (min-width: 1024px) {
      font-size: 48px;
      display: inline-block;
      margin: 0;
    }
    @media (max-width: 1023px) {
      font-size: 24px;
      display: inline-block;
      margin: 0;
    }
  `,

  ImageContainer: styled('div')`
    @media (min-width: 1024px) {
      width: 65%;
    }
    @media (max-width: 1023px) {
      width: 100%;
    }
  `,

  EventTagsContainer: styled('div')`
    margin: 16px 0;
    display: flex;
    flex-wrap: wrap;
  `,

  EventImage: styled('img')`
    width: 100%;
    max-height: 240px;
    object-fit: cover;
    margin-bottom: 20px;
  `,

  DateProgressBar: styled('div')`
    background-color: white;
    box-shadow: ${props => props.theme.effects.boxShadowPrimary};
    margin: 24px 0;
    padding: 4px 12px;
  `,

  EventCardContainer: styled('div')`
    @media (min-width: 1024px) {
      padding: 24px;
      background-color: ${props => props.theme.colors.white};
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      box-shadow: ${props => props.theme.effects.boxShadowPrimary};
    }
    @media (max-width: 1023px) {
      padding: 24px;
      background-color: ${props => props.theme.colors.white};
      width: 100%;
      display: block;
      box-shadow: ${props => props.theme.effects.boxShadowPrimary};
    }
  `,

  DescriptionContainer: styled('div')`
    width: 95%;
  `,

  Paragraph: styled(Paragraph)`
    color: ${props => props.theme.colors.black};
    margin: 0;
    padding: 0;
  `,

  Provider: styled(Paragraph)`
    font-weight: 600;
  `,

  A: styled('a')`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none !important;
  `,

  ATitle: styled('h2')`
    color: ${props => props.theme.colors.black};
    font-size: 20px;
    display: inline-block;
    margin: 0;
    padding: 0;
    font-weight: 500;
  `,

  ProgressBar: styled('div')`
    @media (min-width: 1024px) {
      position: relative;
      margin-bottom: 8px;
      width: 60%;
      border: 1px solid ${props => props.theme.colors.primary};
      border-radius: 50px;
      height: 12px;
      box-sizing: content-box;
      height: 12px;
    }
    @media (max-width: 1023px) {
      position: relative;
      margin-bottom: 8px;
      width: 100%;
      border: 1px solid ${props => props.theme.colors.primary};
      border-radius: 50px;
      height: 12px;
      box-sizing: content-box;
      height: 12px;
    }
  `,
  ProgressBarContent: styled('span')`
    display: block;
    height: 100%;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.primary};
    position: relative;
    overflow: hidden;
  `,
  SearchButton: styled('button')`
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.effects.boxShadowPrimary};
    padding: 8px 16px;
    border: none;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.black};
  `,
  GridContainer: styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  CardTag: styled(CardTag)`
    display: block;
    margin: 0;
    margin-right: 8px;
  `,
};

export function EventDetailPage({ params }: RouteComponentProps) {
  const { data: event, error } = useSWR(() => '/event/' + params.id);

  if (error)
    return <ErrorBanner>Er ging iets fout: ({error.message})</ErrorBanner>;
  if (!event) return <Spinner />;

  interface Props {
    start: any;
    end: any;
    slot: any;
  }
  const AvailablePlaces: React.FC<Props> = ({ start, end, slot }) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    return (
      <styles.DateProgressBar key={slot.id}>
        <Paragraph>
          {start.toLocaleDateString('nl-NL', options)}{' '}
          {start.toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -{' '}
          {end.toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Paragraph>
      </styles.DateProgressBar>
    );
  };

  return (
    <styles.Container>
      <styles.EventCardContainer>
        <styles.EventInformation>
          <styles.Title>
            {event.name}
            <Border />
          </styles.Title>

          <styles.GridContainer>
            <styles.EventTagsContainer>
              <styles.CardTag>
                {formatAges(event.minAge, event.maxAge)}
              </styles.CardTag>
              <styles.CardTag>{event.district}</styles.CardTag>
              {event.tags.map((tag: any) => {
                return (
                  <>
                    <CardTag
                      style={{
                        marginRight: '8px',
                      }}
                    >
                      {event.minAge}-{event.maxAge} jaar
                    </CardTag>
                    <CardTag
                      style={{
                        marginRight: '8px',
                      }}
                    >
                      {tag.name}
                    </CardTag>
                    <CardTag
                      style={{
                        marginRight: '8px',
                      }}
                    >
                      {event.district}
                    </CardTag>
                  </>
                );
              })}
            </styles.EventTagsContainer>

            <styles.Provider>{event.organisation.name}</styles.Provider>
          </styles.GridContainer>

          <styles.DescriptionContainer>
            <RichText text={event.description} />
          </styles.DescriptionContainer>

          <styles.DescriptionContainer>
            <h2>Kosten deelname</h2>
            <Paragraph>{event.price}</Paragraph>
          </styles.DescriptionContainer>

          {event.information && event.information.length ? (
            <styles.DescriptionContainer>
              <h2>Hoe kan je je aanmelden?</h2>
              <RichText text={event.information} />
            </styles.DescriptionContainer>
          ) : null}

          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '48px 0 80px 0',
            }}
          >
            <SecondaryButton>Meld je aan</SecondaryButton>
          </div>

          <styles.A href={`#/events?organisationId=${event.organisationId}`}>
            <ChevronRight size={28} stroke={'black'} />
            <styles.ATitle>Alle activiteiten van deze aanbieder</styles.ATitle>
          </styles.A> */}
        </styles.EventInformation>

        <styles.EventDetails>
          <styles.ImageContainer>
            <styles.EventImage src={event.image} alt={event.name} />

            <DFlex style={{ alignItems: 'center' }}>
              <MapPin size={24} />
              <Paragraph style={{ margin: '0 10px' }}>
                <Location
                  lat={event.location.coordinates[1]}
                  lon={event.location.coordinates[0]}
                />
              </Paragraph>
            </DFlex>

            {event.slots.map((slot: any) => {
              const start = new Date(slot.startTime);
              const end = new Date(slot.endTime);
              return <AvailablePlaces end={end} start={start} slot={slot} />;
            })}
          </styles.ImageContainer>
        </styles.EventDetails>
      </styles.EventCardContainer>
    </styles.Container>
  );
}
