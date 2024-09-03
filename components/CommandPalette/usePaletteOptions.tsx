'use client';

import { sortedBlogPost } from '@/lib/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import {
  HiOutlineDocumentAdd,
  HiOutlineDocumentDuplicate,
  HiOutlineHome,
  HiOutlinePencil,
  HiOutlineUser,
} from 'react-icons/hi';
import { TbBolt, TbBoltOff } from 'react-icons/tb';

type PaletteOption = {
  id: string;
  name: string;
  onSelect: (v: string) => void;
  icon?: ReactNode;
};

export default function usePaletteOptions() {
  const router = useRouter();
  const sortedPosts = sortedBlogPost(allBlogs);
  const { theme, setTheme } = useTheme();

  const generalOptions: PaletteOption[] = [
    {
      id: 'Toggle Theme',
      name: 'Toggle Theme',
      icon: theme === 'dark' ? <TbBolt /> : <TbBoltOff />,
      onSelect: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
    {
      id: 'Copy Current URL',
      name: 'Copy Current URL',
      icon: <HiOutlineDocumentDuplicate />,
      onSelect: () => navigator.clipboard.writeText(window.location.href),
    },
  ];

  const pageOptions: PaletteOption[] = [
    { id: '/', name: 'Home', icon: <HiOutlineHome />, onSelect: (v) => router.push(v) },
    { id: '/api', name: 'Api Docs', icon: <HiOutlinePencil />, onSelect: (v) => router.push(v) },
    { id: '/lyrics', name: 'Lyrics', icon: <HiOutlineUser />, onSelect: (v) => router.push(v) },
    {
      id: '/playlist',
      name: 'Playlist',
      icon: <HiOutlineDocumentAdd />,
      onSelect: (v) => router.push(v),
    },
    { id: '/imagine', name: 'Imagine', icon: <HiOutlineUser />, onSelect: (v) => router.push(v) },
    { id: '/chat', name: 'Ai', icon: <HiOutlineUser />, onSelect: (v) => router.push(v) },
    {
      id: '/horoscope',
      name: 'Horoscope',
      icon: <HiOutlineUser />,
      onSelect: (v) => router.push(v),
    },
    { id: '/game', name: 'Guessnumber', icon: <HiOutlineUser />, onSelect: (v) => router.push(v) },
  ];

  const blogOptions: PaletteOption[] = sortedPosts.map((post) => ({
    id: post.slug,
    name: post.title,
    onSelect: (v) => router.push(`/blog/${v}`),
  }));

  return { pageOptions, blogOptions, generalOptions };
}
