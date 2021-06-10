import React from 'react';
import { Link } from 'wouter';
import { ErrorBanner } from '../../components/error-banner';
import { Spinner } from '../../components/spinner';
import { Title } from '../../components/text/text';
import { useApi } from '../../hooks/use-api';

export function UserListPage() {
  const { data: users, loading, error } = useApi(
    `/user?showEventProviders=true`
  );

  if (loading || !users) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorBanner>Oeps! Er ging iets mis ({error.message})</ErrorBanner>;
  }

  return (
    <>
      <Title>Aanbieders</Title>
      <Link to="/admin/users/create">Aanbieder uitnodigen</Link>
      {users.map((user: any) => (
        <p key={user.id}>
          {user.firstName} {user.lastName} {user.email}
        </p>
      ))}
    </>
  );
}
