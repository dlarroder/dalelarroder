export default function UsesTitle() {
  return (
    <div className="mb-8 flex flex-col space-y-2 text-center">
      <h1 className="text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        What I Use
      </h1>
      <span className="text-gray-700  dark:text-gray-300">
        Inspired by{' '}
        <a
          href="https://wesbos.com/uses"
          className="underline-magical"
          target="_blank"
          rel="noreferrer"
        >
          Wes bos
        </a>
      </span>
    </div>
  );
}
