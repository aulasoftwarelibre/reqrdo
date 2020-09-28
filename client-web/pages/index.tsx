import { useMercure } from '@liinkiing/use-mercure';
import { NextPage } from 'next';
import React from 'react';
import useFetch from 'use-http';

import { Checker, CircularProgressBar, Title } from '../components';
import { Room } from '../lib/model';

const Home: NextPage = () => {
  const [room, setRoom] = React.useState<Room>();
  const { get, response } = useFetch();

  useMercure<Room>(
    `${process.env.NEXT_PUBLIC_API_TOPIC}/rooms/asl`,
    (message: Room) => {
      const convert: Room = {
        ...message,
        people:
          typeof message.people === 'object'
            ? Object.values(message.people)
            : message.people,
      };
      setRoom(convert);
    }
  );

  React.useEffect(() => {
    init();
  }, []);

  async function init() {
    const initStatus: Room = await get('/rooms/asl');
    if (response.ok) setRoom(initStatus);
  }

  return (
    <div className="flex min-h-full">
      <div className="m-auto space-y-5">
        <Title text="¿Cuánta gente hay en el aula?" />
        {process.browser && room && (
          <>
            <CircularProgressBar
              range={room.capacity}
              value={room.occupation}
              radius={400}
            />
            <Checker room={room} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
