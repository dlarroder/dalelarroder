'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Heading } from './extract-headings';

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1,
      },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle scroll to bottom - activate last heading
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // Check if user has scrolled to the bottom (within 10px threshold)
      if (scrollHeight - scrollTop - clientHeight < 10) {
        const lastHeading = headings[headings.length - 1];
        if (lastHeading) {
          setActiveId(lastHeading.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden lg:block pt-3">
      <div className="sticky top-24 w-58">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          On this page
        </h2>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isH3 = heading.level === 3;

            return (
              <li key={heading.id} className={isH3 ? 'ml-4' : ''}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                      window.history.pushState(null, '', `#${heading.id}`);
                    }
                  }}
                  className={classNames(
                    'block py-1 transition-colors duration-200',
                    {
                      'dark:text-white text-black underline': isActive,
                      'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100':
                        !isActive,
                    },
                  )}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
