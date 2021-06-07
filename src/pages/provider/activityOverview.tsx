import * as React from 'react';
import { styled } from 'goober';
import { useHashLocation } from '../../components/hash-router';
import { Calendar, Edit3, Grid, MapPin, Plus, Trash2 } from 'react-feather';
import {
  Main,
  Title,
  ActivityCard,
  CardWrapper,
  ActivityImage,
  CardTextContainer,
  CardTitle,
  CardIconContainer,
  NewActivityCardTextContainer,
  NewActivityTitle,
  Header,
  AddActivityButton,
  HeaderNavigation,
  NavItem,
  Border,
} from '../../components/forms/input';

const styles = {
  Header: styled(Header)`
    display: flex;
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
        <Title>
          Kinderboerderij 't zwarte schaap
          <Border />
        </Title>
        <AddActivityButton onClick={() => navigate('/aanbieder/activiteit-toevoegen')}>
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
        <ActivityCard>
          <ActivityImage src={'https://picsum.photos/1920/1080'} />
          <CardTextContainer>
            <CardTitle>
              Duurzaam voedsel
              <Border />
            </CardTitle>
          </CardTextContainer>
          <CardIconContainer>
            <Trash2
              style={{ float: 'right', padding: '0 4px' }}
              size={18}
              stroke={'#7a7a7a'}
            />
            <Edit3 style={{ float: 'right' }} stroke={'#7a7a7a'} size={18} />
          </CardIconContainer>
        </ActivityCard>
        <ActivityCard>
          <ActivityImage src={'https://picsum.photos/1920/1080'} />
          <CardTextContainer>
            <CardTitle>
              Duurzaam voedsel
              <Border />
            </CardTitle>
          </CardTextContainer>
          <CardIconContainer>
            <Trash2
              style={{ float: 'right', padding: '0 4px' }}
              size={18}
              stroke={'#7a7a7a'}
            />
            <Edit3 style={{ float: 'right' }} stroke={'#7a7a7a'} size={18} />
          </CardIconContainer>
        </ActivityCard>
        <ActivityCard>
          <ActivityImage src={'https://picsum.photos/1920/1080'} />
          <CardTextContainer>
            <CardTitle>
              Duurzaam voedsel
              <Border />
            </CardTitle>
          </CardTextContainer>
          <CardIconContainer>
            <Trash2
              style={{ float: 'right', padding: '0 4px' }}
              size={18}
              stroke={'#7a7a7a'}
            />
            <Edit3 style={{ float: 'right' }} stroke={'#7a7a7a'} size={18} />
          </CardIconContainer>
        </ActivityCard>
        <ActivityCard>
          <ActivityImage src={'https://picsum.photos/1920/1080'} />
          <CardTextContainer>
            <CardTitle>
              Duurzaam voedsel
              <Border />
            </CardTitle>
          </CardTextContainer>
          <CardIconContainer>
            <Trash2
              style={{ float: 'right', padding: '0 4px' }}
              size={18}
              stroke={'#7a7a7a'}
            />
            <Edit3 style={{ float: 'right' }} stroke={'#7a7a7a'} size={18} />
          </CardIconContainer>
        </ActivityCard>

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
