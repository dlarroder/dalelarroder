export default function Contact() {
  return (
    <div className="flex h-screen flex-col justify-evenly text-black dark:bg-black dark:text-white">
      <div className="flex flex-col py-8">
        <p
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-speed="25"
          className="whitespace-nowrap text-4xl md:text-[120px] md:leading-[120px]"
        >
          Let's make something great together. Let's make something great together.
        </p>
      </div>

      <span className="text-center text-base md:text-2xl">
        Have a project or want to talk? Say hello@dalelarroder.com
      </span>

      <div className="flex flex-col py-8">
        <p
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-speed="16"
          className="whitespace-nowrap text-4xl md:text-[120px] md:leading-[120px]"
        >
          Let's make something great together. Let's make something great together.
        </p>
      </div>
    </div>
  )
}
