import React from 'react';
import { useUser } from '../context/user-context';

type Role = 'admin' | 'moderator' | 'editor' | 'member' | 'anonymous';

type GuardProps = {
  role: Role | Role[];
  render: () => JSX.Element;
};

export function Guard({ role, render }: GuardProps) {
  const user = useUser();

  // @ts-ignore
  if (user.isLoggedIn() && role.includes(user.role)) {
    return render();
  }

  return <></>;
}

export default Guard;
