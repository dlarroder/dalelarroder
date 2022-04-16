export default function WhatIdo() {
  return (
    <>
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        What I Do
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="w-full cursor-pointer duration-200 hover:scale-[1.03] h-full p-[6px] bg-gradient-to-r  from-[#a5f3fc] to-[#3A41A4] rounded-lg space-y-2">
          <div className="py-4 px-6 bg-white dark:bg-black dark:bg-brand-black h-full rounded-lg">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl  md:text-2xl">
              <span className="pr-2" role="img" aria-label="wave">
                ⚙
              </span>
              Building Project
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              I'm very active on Github to create open-source projects or personal projects,
              sometimes I also contribute to open-source projects.
            </p>
          </div>
        </div>
        <div className="w-full cursor-pointer duration-200 hover:scale-[1.03] h-full p-[6px] bg-gradient-to-r  from-[#9333ea] to-[#3A41A4] rounded-lg space-y-2">
          <div className="py-4 px-6 bg-white dark:bg-black dark:bg-brand-black h-full rounded-lg">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl  md:text-2xl">
              <span className="pr-2" role="img" aria-label="wave">
                📗
              </span>
              Writing
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              I also often write to summarize my learning results. I usually write on medium or
              personal blogs.
            </p>
          </div>
        </div>
        <div className="w-full cursor-pointer duration-200 hover:scale-[1.03] h-full p-[6px] bg-gradient-to-r  from-[#14b8a6] to-[#3A41A4] rounded-lg space-y-2">
          <div className="py-4 px-6 bg-white dark:bg-black dark:bg-brand-black h-full rounded-lg">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl  md:text-2xl">
              <span className="pr-2" role="img" aria-label="wave">
                📦
              </span>
              Collaboration
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              I usually collaborate using Github and have collaborated with other programmers
              several times.
            </p>
          </div>
        </div>
        <div className="w-full cursor-pointer duration-200 hover:scale-[1.03] h-full p-[6px] bg-gradient-to-r  from-[#fcd34d] to-[#f97316] rounded-lg space-y-2">
          <div className="py-4 px-6 bg-white dark:bg-black dark:bg-brand-black h-full rounded-lg">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl  md:text-2xl">
              <span className="pr-2" role="img" aria-label="wave">
                🎨
              </span>
              Design
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              besides coding, I also like design, I usually design using Figma or similar tools.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
