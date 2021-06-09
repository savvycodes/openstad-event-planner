import * as React from 'react';
import { BorderedTitle, Paragraph } from '../../components/text/text';
import { EmptyState, Header, Main } from '../../components/layout/layout';
import {
  ListItem,
  List,
  ListItemIcons,
  ListItemInformation,
} from '../../components/list/list';
import { Edit3 } from 'react-feather';
import { styled } from 'goober';
import { Button } from '../../components/button/button';
import { useHashLocation } from '../../components/hash-router';

const providers = [
  {
    name: 'Stan',
    surname: 'Turner',
    email: 'stan@savvy.codes',
    key: '1',
  },
  {
    name: 'Piet',
    surname: 'Jansen',
    email: 'p.jansen@gmail.com',
    key: '2',
  },
  {
    name: 'Klaas',
    surname: 'Jan',
    email: 'jan2002@savvy.codes',
    key: '3',
  },
  {
    name: 'Marco',
    surname: 'Borsato',
    email: 'marcoborsato1912@gmail.com',
    key: '4',
  },
  {
    name: 'Stan',
    surname: 'Turner',
    email: 'stan@savvy.codes',
    key: '5',
  },
  {
    name: 'Piet',
    surname: 'Jansen',
    email: 'p.jansen@gmail.com',
    key: '6',
  },
  {
    name: 'Klaas',
    surname: 'Jan',
    email: 'jan2002@savvy.codes',
    key: '7',
  },
  {
    name: 'Marco',
    surname: 'Borsato',
    email: 'marcoborsato1912@gmail.com',
    key: '8',
  },
];

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

/**
 * Provider contact details form
 * @returns
 */
export function ProviderOverviewPage(): JSX.Element {
  const [, navigate] = useHashLocation();
  return (
    <Main>
      <styles.Header>
        <BorderedTitle title="Aanbieders" />
        <Button onClick={() => navigate('/aanbieder/aanbieder-toevoegen')}>
            Aanbieder toevoegen
        </Button>
      </styles.Header>

      {providers && providers.length > 0 ? (
        <List>
          {providers.map(provider => (
            <ListItem key={provider.key}>
              <ListItemInformation>
                <styles.ListItemInformationParagraph>
                  {provider.email}
                </styles.ListItemInformationParagraph>
                <styles.ListItemInformationParagraph>
                  {provider.name}
                </styles.ListItemInformationParagraph>
                <styles.ListItemInformationParagraph>
                  {provider.surname}
                </styles.ListItemInformationParagraph>
              </ListItemInformation>
              <ListItemIcons>
                <Edit3
                  onClick={() => console.log('clicked')}
                  stroke={'#7a7a7a'}
                  size={20}
                />
              </ListItemIcons>
            </ListItem>
          ))}
        </List>
      ) : (
        <EmptyState>
          <Paragraph>Er zijn nog geen aanbieders. Voeg er een toe!</Paragraph>{' '}
          <Button onClick={() => navigate('/aanbieder/aanbieder-toevoegen')}>
            toevoegen
          </Button>{' '}
        </EmptyState>
      )}
    </Main>
  );
}
