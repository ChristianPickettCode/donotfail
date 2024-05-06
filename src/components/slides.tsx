import { Separator } from "./ui/separator";

export function Slides() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
      <div className="mb-8 md:mb-6 lg:mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          Slides
        </h1>
      </div>
      {
        Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <section key={index} className="flex w-full my-8 items-center pl-4 pr-8">
              {/* <div className="flex items-center justify-center w-12 h-full mr-4">
                <span className="text-4xl font-bold">{index + 1}</span>
              </div> */}
              <img
                alt="Placeholder Image"
                className="h-[40vh] w-auto bg-gray-300"
                src="/placeholder.svg"
              />
              <div className="flex flex-col justify-center ml-6 w-1/2 md:w-full">
                <p className="text-base mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim
                  sit amet, adipiscing nec, ultricies sed, dolor.
                </p>
                <p className="text-base">
                  Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                </p>
              </div>

            </section>
            <p className='text-right pr-2'>{index + 1}</p>
            <Separator />
          </div>
        ))
      }

    </main>
  )
}
