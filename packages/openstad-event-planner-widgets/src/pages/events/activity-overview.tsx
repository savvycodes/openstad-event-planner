import * as React from 'react';
import { styled } from 'goober';
import { Route } from 'wouter';

import { useHashLocation } from '../../components/hash-router';
import { NavItem } from '../../components/text/text';
import { ActivityCards, CardWrapper } from '../../components/card/card';
import { Header } from '../../components/layout/layout';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';
import { Button } from '../../components/button/button';

import { useApi } from '../../hooks/use-api';
import { useConfig } from '../../context/config-context';
import { removeEvent } from '../../endpoints/event';
import { ContactDetailsPage } from '../organisation/contact';
import { OrganisationSettingsPage } from '../organisation/settings';

import '../../styles/activities.css';

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
  ButtonRow: styled('div')`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
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
    <main className="component-main">
      <div className="tab-nav">
        <NavItem
          className="tab-nav__item"
          onClick={() => navigate('/events')}
          active={location === '/events'}
        >
          Activiteiten
        </NavItem>
        <NavItem
          className="tab-nav__item"
          onClick={() => navigate('/events/settings')}
          active={location === '/events/settings'}
        >
          Organisatiegegevens
        </NavItem>
        <NavItem
          className="tab-nav__item"
          onClick={() => navigate('/events/contact')}
          active={location === '/events/contact'}
        >
          Contactpersoon
        </NavItem>
      </div>

      <Route
        path="/events"
        component={() => (
          <>
            {organisation && organisation.id ? (
              <ActivityList organisationId={organisation.id} />
            ) : (
              <Spinner />
            )}
          </>
        )}
      />
      <Route path="/events/settings" component={OrganisationSettingsPage} />
      <Route path="/events/contact" component={ContactDetailsPage} />
    </main>
  );
}

type ActivityListProps = {
  organisationId: number;
};

function ActivityList({ organisationId }: ActivityListProps) {
  const [, navigate] = useHashLocation();
  const config = useConfig();
  const [page, setPage] = React.useState(1);
  const { data, loading, error, reload } = useApi(
    `/event?organisationId=${organisationId}&page=${page}`
  );
  const [deleteError, setDeleteError] = React.useState<Error | any>(null);
  const [events, setEvents] = React.useState([]);

  async function handleDelete(id: number) {
    setDeleteError(null);
    try {
      await removeEvent(config, id);
      reload();
    } catch (err) {
      setDeleteError(err);
    }
  }

  React.useEffect(() => {
    if (data?.records) {
      setEvents((events: any) => {
        events = events || [];
        return events.concat(data.records);
      });
    }
  }, [data]);

  function nextPage() {
    if (data?.metadata?.pageCount > page) {
      setPage(page + 1);
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
      <h3>Activiteiten</h3>
      <CardWrapper>
        {events.map((event: any) => (
          <ActivityCards
            key={event.id}
            src={event.image}
            title={event.name}
            description={event.description}
            onDelete={() => handleDelete(event.id)}
            onEdit={() => navigate(`/events/${event.id}/edit`)}
          />
        ))}
        <button
          className="add-activity-button"
          onClick={() => navigate('/events/create')}
        >
          Activiteit toevoegen
        </button>
        {data?.metadata?.pageCount > page ? (
          <styles.ButtonRow>
            <Button onClick={nextPage}>Meer laden</Button>
          </styles.ButtonRow>
        ) : null}
      </CardWrapper>
    </>
  );
}
