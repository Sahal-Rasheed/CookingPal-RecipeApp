const RecipeCardLoadingSkeleton = () => {
  return (
    <div className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden rounded-xl relative">
        <img
          className="h-full w-full rounded bg-gray-300 animate-pulse"
        />
        <span className="absolute top-0 right-0 p-1 m-2 w-1/3 rounded h-5 bg-gray-300 animate-pulse">
        </span>
      </div>
      <div className="mx-5">
        <p className="mt-3 bg-gray-300 animate-pulse rounded h-3 w-1/3 mb-2">
        </p>
        <h3 className="bg-gray-300 animate-pulse rounded h-3 w-1/3 mb-4"></h3>
        <p className="bg-gray-300 animate-pulse rounded h-3 mt-1 mb-7 w-1/5">
          {Math.floor(Math.random() * (60 - 10 + 1)) + 10} min
        </p>
      </div>
  </div>
  )
}

export default RecipeCardLoadingSkeleton