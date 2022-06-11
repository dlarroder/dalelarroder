import dynamic from 'next/dynamic'

const GiscusComponent = dynamic(
  () => {
    return import('@/components/comments/Giscus')
  },
  { ssr: false }
)

const Comments = () => {
  return (
    <div id="comment">
      <GiscusComponent />
    </div>
  )
}

export default Comments
