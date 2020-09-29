import { useSession } from 'next-auth/client';
import React from 'react';
import useFetch, { CachePolicies } from 'use-http';

import { Room } from '../../lib/model';
import { useNotification } from '../../lib/state/notification';
import { Button } from '../Button';

export interface Props {
  room: Room;
}

export const Checker: React.FunctionComponent<Props> = ({ room }) => {
  const [session, isLoading] = useSession();
  const { post, response } = useFetch({
    cachePolicy: CachePolicies.NO_CACHE,
  });
  const { showNotification } = useNotification();

  if (!session || isLoading) return <></>;

  const checked = !!room?.people.find(
    (e) => e === `/api/users/${session.user.name}`
  );

  async function checkIn() {
    const message = await post('/rooms/check_in_requests', { room: room.slug });
    if (!response.ok) {
      showNotification('Ocurrió un error', message['hydra:description']);
    }
  }

  async function checkOut() {
    const message = await post('/rooms/check_out_requests', {
      room: room.slug,
    });
    if (!response.ok) {
      showNotification('Ocurrió un error', message['hydra:description']);
    }
  }

  if (checked) {
    return <Button text="Salir" onClick={() => checkOut()} />;
  }

  return <Button text="Entrar" onClick={() => checkIn()} />;
};
