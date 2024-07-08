const DetailPageLoadingSkeleton = ({ ingredients, measurements, instructions }) => {
  return (
    <section className="py-1 mx-20 overflow-hidden mb-5">
    <h1 className="text-start text-4xl font-extrabold tracking-wide mb-5">Recipe Details</h1>
    <div className="border shadow pt-5">
      <div className="px-10 py-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="py-5 w-full h-80 mb-14 sm:h-[650px] sm:mb-4 sm:w-full md:w-full lg:w-[90%] lg:h-[700px] bg-gray-300 rounded animate-pulse">
        </div>
        <div>
          <h1 className="pt-6 pb-5 h-5 bg-gray-300 rounded animate-pulse mb-2">
          </h1>
          <p className="pt-5 h-5 bg-gray-300 rounded animate-pulse mb-2 w-1/2"></p>
          <p className="pt-5 h-5 bg-gray-300 rounded animate-pulse mb-2 w-1/3"></p>
          <p className="pt-5 h-5 bg-gray-300 rounded animate-pulse mb-2 w-1/5"></p>
          <div className="rounded-sm py-5 my-10">
            <h2 className="h-5 bg-gray-300 animate-pulse rounded"></h2>
            <ul className="flex flex-wrap my-5 gap-x-24 gap-y-3">
              {Array(ingredients).fill(0).map((_, index) => (
                <li className="w-44 h-5 bg-gray-300 animate-pulse rounded" key={index}>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm py-5 my-10">
            <h2 className="h-5 bg-gray-300 animate-pulse rounded"></h2>
            <ul className="flex flex-wrap my-5 gap-x-24 gap-y-3">
              {Array(measurements).fill(0).map((_, index) => (
                <li className="font-bold w-44 h-5 bg-gray-300 animate-pulse rounded" key={index}>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="py-5 mx-10 mb-10">
        <h2 className="mb-3 h-5 bg-gray-300 animate-pulse rounded"></h2>
        {Array(instructions).fill(0)
          .map((_, index) => (
            <p key={index} className="mb-3 h-5 bg-gray-300 animate-pulse rounded"></p>
          ))}
      </div>
    </div>
  </section>
  )
}

export default DetailPageLoadingSkeleton