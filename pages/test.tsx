import Header from '../components/Header'

export default function Test() {
  return (
    <div className="flex flex-col">
      <Header />
      <section
        id="intro"
        className="flex h-screen items-center justify-center bg-green-200 text-center"
        data-scroll-section
      >
        <div className="container mx-auto px-5">
          <h1
            className="text-5xl font-bold"
            data-scroll
            data-scroll-repeat
            data-scroll-call="toggleBackToTop"
          >
            A Simple Demo With{' '}
            <a
              className="underline"
              href="https://locomotivemtl.github.io/locomotive-scroll/"
              target="_blank"
              rel="noreferrer"
            >
              Locomotive Scroll
            </a>
          </h1>
          <p className="mt-2 text-2xl">Scroll down 👇</p>
        </div>
      </section>
      <section className="py-40" data-scroll-section>
        <div className="mx-auto px-5 lg:container">
          <nav>
            <ul className="grid justify-center gap-4 text-center md:grid-flow-col lg:gap-16">
              <li>
                <a
                  className="inline-block rounded-md border-4 border-double border-transparent px-4 py-2 text-2xl font-medium transition focus:border-green-400 hover:border-green-400"
                  href="#about-section"
                  data-scroll-to
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="inline-block rounded-md border-4 border-double border-transparent px-4 py-2 text-2xl font-medium transition focus:border-green-400 hover:border-green-400"
                  href="#office"
                  data-scroll-to
                >
                  Office
                </a>
              </li>
              <li>
                <a
                  className="inline-block rounded-md border-4 border-double border-transparent px-4 py-2 text-2xl font-medium transition focus:border-green-400 hover:border-green-400"
                  href="#services"
                  data-scroll-to
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="inline-block rounded-md border-4 border-double border-transparent px-4 py-2 text-2xl font-medium transition focus:border-green-400 hover:border-green-400"
                  href="#case-studies"
                  data-scroll-to
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  className="relative inline-block rounded-md border-4 border-double border-transparent px-4 py-2 text-2xl font-medium transition focus:border-green-400 hover:border-green-400"
                  href="#clients-section"
                  data-scroll-to
                >
                  Clients
                </a>
              </li>
              <li>
                <a
                  className="inline-block rounded-md border-4 border-double border-transparent px-4 py-2 text-2xl font-medium transition focus:border-green-400 hover:border-green-400"
                  href="#contact"
                  data-scroll-to
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="h-screen bg-green-50 py-40" data-scroll-section>
        <div className="container mx-auto px-5">
          <div id="about" className="h-[300px]">
            <div
              className="text-5xl font-extrabold text-black"
              data-scroll
              data-scroll-sticky
              data-scroll-target="#about"
            >
              <h1>About</h1>
            </div>
          </div>
        </div>
      </section>
      <section
        id="intro"
        className="flex h-screen items-center justify-center bg-green-200 text-center"
        data-scroll-section
      >
        <div className="container mx-auto px-5">
          <h1
            className="text-5xl font-bold"
            data-scroll
            data-scroll-repeat
            data-scroll-call="toggleBackToTop"
          >
            A Simple Demo With{' '}
            <a
              className="underline"
              href="https://locomotivemtl.github.io/locomotive-scroll/"
              target="_blank"
              rel="noreferrer"
            >
              Locomotive Scroll
            </a>
          </h1>
          <p className="mt-2 text-2xl">Scroll down 👇</p>
        </div>
      </section>
    </div>
  )
}
