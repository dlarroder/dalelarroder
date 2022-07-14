import kebabCase from '@/lib/utils/kebabCase'
import type { Blog, DocumentTypes } from 'contentlayer/generated'

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortedBlogPost(allBlogs: Blog[]) {
  return allBlogs.sort((a, b) => dateSortDesc(a.date, b.date)).filter((p) => p.draft === false)
}

type ConvertUndefined<T> = OrNull<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}>
type OrNull<T> = { [K in keyof T]: Exclude<T[K], undefined> | null }
type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>

/**
 *
 * https://github.com/contentlayerdev/contentlayer/issues/24
 */
export const pick = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
): ConvertPick<{ [K in Keys]: Obj[K] }> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key] ?? null
    return acc
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any)
}

export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj)
  keys.forEach((key) => {
    delete result[key]
  })
  return result
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>

export function coreContent<T extends DocumentTypes>(content: T) {
  return omit(content, ['body', '_raw', '_id'])
}

export function allCoreContent<T extends DocumentTypes>(contents: T[]) {
  return contents.map((c) => coreContent(c))
}

// TODO: refactor into contentlayer once compute over all docs is enabled
export async function getAllTags(allBlogs: Blog[]) {
  const tagCount: Record<string, number> = {}
  // Iterate through each post, putting all found tags into `tags`
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}
