import Link from '@/components/Link';
import Tag from '@/components/Tag';
import MainLayout from '@/layouts/MainLayout';
import { getAllTags } from '@/lib/utils/contentlayer';
import kebabCase from '@/lib/utils/kebabCase';
import { allBlogs } from 'contentlayer/generated';

export default function Tags() {
  const tags = getAllTags(allBlogs);
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <MainLayout>
      <div className="space-y-2 rounded-lg pt-8 pb-3 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Tags
        </h1>
      </div>
      <div className="flex flex-wrap gap-3">
        {Object.keys(tags).length === 0 && 'No tags found.'}
        {sortedTags.map((t) => {
          return (
            <div key={t} className="mb-5 flex items-center">
              <Tag text={t} />
              <Link
                href={`/tags/${kebabCase(t)}`}
                className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
              >
                {` (${tags[t]})`}
              </Link>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
