import * as React from 'react';
import { styled } from 'goober';
import { Plus } from 'react-feather';
import { Route } from 'wouter';

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
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';

import { useApi } from '../../hooks/use-api';
import { useConfig } from '../../context/config-context';
import { removeEvent } from '../../endpoints/event';
import { OrganisationSettingsPage } from '../organisation/settings';

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
  const [location, navigate] = useHashLocation();
  const { data: organisation } = useApi('/organisation/me');

  return (
    <Main>
      <styles.Header>
        <BorderedTitle title={organisation ? organisation.name : ''} />
        <Route path="/events">
          <AddActivityButton onClick={() => navigate('/events/create')}>
            {' '}
            <Plus
              style={{ padding: '0 12px' }}
              strokeWidth={4}
              size={28}
              stroke={'#7a7a7a'}
            />
            <NewActivityTitle>Voeg activiteit toe</NewActivityTitle>
          </AddActivityButton>
        </Route>
      </styles.Header>

      <styles.SubHeader>
        <HeaderNavigation>
          <NavItem
            onClick={() => navigate('/events')}
            active={location === '/events'}
          >
            Activiteiten
          </NavItem>
          <NavItem
            onClick={() => navigate('/events/settings')}
            active={location === '/events/settings'}
          >
            Uw gegevens
          </NavItem>
        </HeaderNavigation>
      </styles.SubHeader>

      <Route
        path="/events"
        component={() => (
          <CardWrapper>
            {organisation && organisation.id ? (
              <ActivityList organisationId={organisation.id} />
            ) : (
              <Spinner />
            )}
          </CardWrapper>
        )}
      />
      <Route
        path="/events/settings"
        component={OrganisationSettingsPage}
        // component={() => (
        //   <CardWrapper>
        //     {organisation && organisation.id ? (
        //       <ActivityList organisationId={organisation.id} />
        //     ) : (
        //       <Spinner />
        //     )}
        //   </CardWrapper>
        // )}
      />
    </Main>
  );
}

type ActivityListProps = {
  organisationId: number;
};

function ActivityList({ organisationId }: ActivityListProps) {
  const [, navigate] = useHashLocation();
  const config = useConfig();
  const { data, loading, error, reload } = useApi(
    `/event?organisationId=${organisationId}`
  );
  const [deleteError, setDeleteError] = React.useState<Error | null>(null);

  async function handleDelete(id: number) {
    setDeleteError(null);
    try {
      await removeEvent(config, id);
      reload();
    } catch (err) {
      setDeleteError(err);
    }
  }

  if (loading || !data) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorBanner>Kon activiteiten niet laden ({error.message})</ErrorBanner>
    );
  }

  if (deleteError) {
    return <ErrorBanner>{deleteError.message}</ErrorBanner>;
  }

  return (
    <>
      {data.records.map((event: any) => (
        <ActivityCards
          key={event.id}
          src={event.image}
          title={event.name}
          onDelete={() => handleDelete(event.id)}
          onEdit={() => navigate(`/events/${event.id}/edit`)}
        />
      ))}
      <ActivityCard newactivity onClick={() => navigate('/events/create')}>
        <NewActivityCardTextContainer>
          <Plus strokeWidth={4} size={28} stroke={'#7a7a7a'} />
          <NewActivityTitle>Voeg activiteit toe</NewActivityTitle>
        </NewActivityCardTextContainer>
      </ActivityCard>
    </>
  );
}
