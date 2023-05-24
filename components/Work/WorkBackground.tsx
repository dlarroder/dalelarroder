export function WorkBackground() {
  return (
    <div
      data-scroll
      data-scroll-sticky
      className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2"
    >
      <div className="h-[30vh] bg-black lg:h-auto"></div>
      <div className="h-[70vh] bg-white lg:h-auto"></div>
    </div>
  )
}
