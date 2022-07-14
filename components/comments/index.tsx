import dynamic from 'next/dynamic'

const GiscusComponent = dynamic(
  () => {
    return import('@/components/Comments/Giscus')
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
