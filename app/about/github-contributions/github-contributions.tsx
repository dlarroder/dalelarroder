import Calendar from './calendar';
import { getContributions } from './github';
import GithubStats from './github-stats';

export default async function GithubContributions() {
  const contributions = await getContributions('dlarroder');

  return (
    <section className="space-y-4">
      <div>
        <p className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Github
        </p>
        <p className="text-gray-500 dark:text-gray-400 leading-4">Contributions Stats</p>
      </div>
      <Calendar contributions={contributions} />
      <GithubStats contributions={contributions} />
    </section>
  );
}
