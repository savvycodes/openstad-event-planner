import React from 'react';
import { useUser } from '../context/user-context';

type GuardProps = {
  role: 'admin' | 'moderator' | 'editor' | 'member' | 'anonymous';
  render: () => JSX.Element;
};

export function Guard({ role, render }: GuardProps) {
  const user = useUser();

  if (user.role === role) {
    return render();
  }

  return <></>;
}

export default Guard;
