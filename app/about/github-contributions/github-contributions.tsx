import Calendar from './calendar';
import { getContributions } from './github';

export default async function GithubContributions() {
  const contributions = await getContributions('dlarroder');

  return (
    <section className="space-y-4">
      <p className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
        Github Contributions
      </p>
      <Calendar contributions={contributions} />
      <div>hello world!</div>
    </section>
  );
}
