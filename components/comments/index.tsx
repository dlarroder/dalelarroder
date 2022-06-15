import dynamic from 'next/dynamic'

const GiscusComponent = dynamic(
  () => {
    return import('./Giscus')
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
