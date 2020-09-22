import { NextPage } from 'next';
import React from 'react';
import useFetch from 'use-http';

import { CircularProgressBar, Title } from '../components';

interface Status {
  capacity: number;
  occupation: number;
}

const Home: NextPage = () => {
  const [status, setStatus] = React.useState<Status>();
  const { get, response } = useFetch('/api');

  React.useEffect(() => {
    init();
  }, []);

  async function init() {
    const initStatus: Status = await get('/rooms/1');
    if (response.ok) setStatus(initStatus);
  }

  return (
    <div className="flex min-h-full">
      <div className="m-auto space-y-5">
        <Title text="¿Cuánta gente hay en el aula?" />
        {process.browser && status && (
          <CircularProgressBar
            range={status.capacity}
            value={status.occupation}
            radius={400}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
