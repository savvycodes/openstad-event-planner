import * as React from 'react';
import { styled } from 'goober';
import { Calendar, Grid, MapPin, Plus } from 'react-feather';

import { useHashLocation } from '../../components/hash-router';
import {
  BorderedTitle,
  NavItem,
  NewActivityTitle,
} from '../../components/text/text';
import {
  ActivityCard,
  ActivityCards,
  AddActivityButton,
  CardWrapper,
  NewActivityCardTextContainer,
} from '../../components/card/card';
import { Header, HeaderNavigation, Main } from '../../components/layout/layout';

const styles = {
  Header: styled(Header)`
    display: flex;
    justify-content: space-between;
    position: relative;
  `,
  SubHeader: styled(Header)`
    @media (max-width: 1023px) {
      display: block;
      position: relative;
      margin-top: 48px;
    }
    @media (min-width: 1024px) {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-top: 48px;
    }
  `,
  RightNavItem: styled(NavItem)`
    padding: 12px 18px;
  `,
};

/**
 * Provider contact details form
 * @returns
 */
export function ProviderActivityOverviewPage(): JSX.Element {
  const [, navigate] = useHashLocation();

  return (
    <Main>
      <styles.Header>
        <BorderedTitle title="Kinderboerderij 't zwarte schaap" />
        <AddActivityButton
          onClick={() => navigate('/aanbieder/activiteit-toevoegen')}
        >
          {' '}
          <Plus
            style={{ padding: '0 12px' }}
            strokeWidth={4}
            size={28}
            stroke={'#7a7a7a'}
          />
          <NewActivityTitle>Voeg activiteit toe</NewActivityTitle>
        </AddActivityButton>
      </styles.Header>

      <styles.SubHeader>
        <HeaderNavigation>
          <NavItem onClick={() => console.log('navigate')} active>
            Activiteiten
          </NavItem>
          <NavItem onClick={() => console.log('navigate')}>Uw gegevens</NavItem>
        </HeaderNavigation>

        <HeaderNavigation>
          <styles.RightNavItem onClick={() => console.log('navigate')} active>
            <Grid style={{ padding: '0 4px' }} size={18} fill={'black'} />
            Tegels
          </styles.RightNavItem>
          <styles.RightNavItem onClick={() => console.log('navigate')}>
            <MapPin style={{ padding: '0 4px' }} size={18} stroke={'black'} />
            Kaart
          </styles.RightNavItem>
          <styles.RightNavItem onClick={() => console.log('navigate')}>
            <Calendar style={{ padding: '0 4px' }} size={18} stroke={'black'} />
            Kalender
          </styles.RightNavItem>
        </HeaderNavigation>
      </styles.SubHeader>

      <CardWrapper>
        <ActivityCards
          src={'https://picsum.photos/id/715/1920/1080'}
          title="Duurzaam voedsel"
        />
        <ActivityCards
          src={'https://picsum.photos/id/716/1920/1080'}
          title="Speurtocht op de stadsboerderij"
        />
        <ActivityCards
          src={'https://picsum.photos/id/717/1920/1080'}
          title="Insecten ontdekken"
        />
        <ActivityCards
          src={'https://picsum.photos/id/718/1920/1080'}
          title="Tipi bouwen"
        />

        <ActivityCard
          newactivity
          onClick={() => navigate('/aanbieder/activiteit-toevoegen')}
        >
          <NewActivityCardTextContainer>
            <Plus strokeWidth={4} size={28} stroke={'#7a7a7a'} />
            <NewActivityTitle>Voeg activiteit toe</NewActivityTitle>
          </NewActivityCardTextContainer>
        </ActivityCard>
      </CardWrapper>
    </Main>
  );
}
