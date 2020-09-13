import { NextPage } from 'next';

import { CircularProgressBar, Title } from '../components';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-full">
      <div className="m-auto space-y-5">
        <Title text="¿Cuánta gente hay en el aula?" />
        {process.browser && (
          <CircularProgressBar range={10} value={3} radius={400} />
        )}
      </div>
    </div>
  );
};

export default Home;
