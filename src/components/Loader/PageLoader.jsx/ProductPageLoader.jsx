import React from 'react'

const ProductPageLoader = () => {
  return (
    <div role='status' className="animate-pulse w-full mt-4 px-5 lg:flex lg:gap-6 md:mb-10 md:px-0 md:w-3/5 lg:w-3/4 md:mx-auto">
    <div className="w-full lg:w-2/4 mb-4 aspect-square bg-gray-200 dark:bg-gray-700">

    </div>
    <div className="flex flex-col p-2">
        <h1 className="text-2xl w-40 p-4 font-semibold mb-2 bg-gray-200 dark:bg-gray-700"></h1>
        <p className="mb-2 p-2 md:w-96 dark:text-gray-400 bg-gray-200 dark:bg-gray-700"></p>
        <p className="mb-3 p-2 w-44 dark:text-gray-400 bg-gray-200 dark:bg-gray-700"></p>
        {/* <ProductRating product={data} /> */}
        <h2 className="font-semibold text-lg mb-1 w-36 p-3 bg-gray-200 dark:bg-gray-700"></h2>
        <h2 className="font-semibold text-lg mb-2 w-32 p-3 bg-gray-200 dark:bg-gray-700"></h2>
        <h2 className="font-semibold text-lg mb-2 w-36 p-3 bg-gray-200 dark:bg-gray-700"></h2>
        <h2 className="font-semibold text-lg mt-2 mb-2 w-28 p-4 bg-gray-200 dark:bg-gray-700"></h2>
        <div className="flex flex-col gap-2 mt-2 md:flex-row lg:mt-2 md:w-3/4 lg:w-2/4">
            <h2 className="font-semibold text-lg mb-1 p-4 md:flex-1 bg-gray-200 dark:bg-gray-700"></h2>
            <h2 className="font-semibold text-lg mb-1 p-4 md:flex-1 bg-gray-200 dark:bg-gray-700"></h2>
        </div>
        <div className="mt-2 w-32 p-2 bg-gray-200 dark:bg-gray-700">
          
        </div>
    </div>
</div>
  )
}

export default ProductPageLoader