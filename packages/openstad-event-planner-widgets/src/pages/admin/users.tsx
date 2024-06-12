import * as React from 'react';
import { styled } from 'goober';

import { BorderedTitle, Paragraph } from '../../components/text/text';
import { EmptyState, Header, Main } from '../../components/layout/layout';
import {
  ListItem,
  List,
  ListItemInformation,
} from '../../components/list/list';
import { Button } from '../../components/button/button';
import { useHashLocation } from '../../components/hash-router';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';

import { useApi } from '../../hooks/use-api';

const styles = {
  ListItemInformationParagraph: styled(Paragraph)`
    text-align: left;
    margin-right: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  Header: styled(Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};

export function UserListPage() {
  const [, navigate] = useHashLocation();

  const { data: providers, loading, error } = useApi(
    `/user?showEventProviders=true`
  );

  if (loading || !providers) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorBanner>Oeps! Er ging iets mis ({error.message})</ErrorBanner>;
  }

  return (
    <Main>
      <styles.Header>
        <BorderedTitle title="Aanbieders" />
        <Button onClick={() => navigate('/admin/users/create')}>
          Aanbieder toevoegen
        </Button>
        <Button onClick={() => navigate('/events/create')}>
          Activiteit toevoegen
        </Button>
        <Button onClick={() => navigate('/events')}>
          Alle activiteiten
        </Button>
      </styles.Header>

      {providers && providers.length > 0 ? (
        <List>
          {providers.map((provider: any) => (
            <ListItem key={provider.id}>
              <ListItemInformation>
                <styles.ListItemInformationParagraph>
                  {provider.email}
                </styles.ListItemInformationParagraph>
                <styles.ListItemInformationParagraph>
                  {provider.firstName}
                </styles.ListItemInformationParagraph>
                <styles.ListItemInformationParagraph>
                  {provider.lastName}
                </styles.ListItemInformationParagraph>
              </ListItemInformation>
            </ListItem>
          ))}
        </List>
      ) : (
        <EmptyState>
          <Paragraph>Er zijn nog geen aanbieders. Voeg er een toe!</Paragraph>{' '}
          <Button onClick={() => navigate('/admin/users/create')}>
            toevoegen
          </Button>{' '}
        </EmptyState>
      )}
    </Main>
  );
}
