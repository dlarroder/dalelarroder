import slugger from 'github-slugger'
import { Heading } from 'mdast'
import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'
import { Toc } from 'types/Toc'
import { Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { VFile } from 'vfile'

export function remarkTocHeadings() {
  return (tree: Parent, file: VFile) => {
    const toc: Toc = []
    visit(tree, 'heading', (node: Heading) => {
      const textContent = toString(node)
      toc.push({
        value: textContent,
        url: '#' + slugger.slug(textContent),
        depth: node.depth,
      })
    })
    file.data.toc = toc
  }
}

export async function extractTocHeadings(markdown: string) {
  const vfile = await remark().use(remarkTocHeadings).process(markdown)
  return vfile.data.toc
}
