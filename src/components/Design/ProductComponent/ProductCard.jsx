import Link from "next/link";
import RatingStars from "@/components/hero/RatingStars";
import { capitalizeFirstLetter } from "@/utils/utils";
import API from "@/config/config";

const ProductCard = ({ product }) => {
  return (
    <div className="cursor-pointer bg-white dark:bg-inherit dark:border-gray-700 dark:border-2 rounded p-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <Link href={`products/${product._id}`}>
        <ProductCardHeader product={product} />
        <ProductCardBody product={product} />
      </Link>
      {/* <ProductCardRating product={product} /> */}
    </div>
  )
}

const ProductCardHeader = ({ product }) => {
  return (
    <div className="w-full aspect-square bg-gray-200 rounded">
      <img src={`${API.defaults.baseURL}/products/${product.product_image}`} className="w-full h-full object-cover rounded" ></img>
    </div>
  )
}

const ProductCardBody = ({ product }) => {
  return (
    <div>
      <div className="w-full mt-2 mb-2">
        <ProductCardInfos product={product} />
      </div>
    </div>
  )
}

const ProductCardInfos = ({ product }) => {
  return (
    <>
      <div className='md:flex md:items-center md:justify-between'>
        <div className="font-bold mb-1 overflow-hidden dark:text-gray-300  whitespace-nowrap md:w-3/5 md:mb-0">{product.product_name}</div>
        <div className="font-bold text-gray-600 dark:text-gray-400 text-sm">Rs. {product.price}</div>
      </div>
      <div>
      <div className="font-bold mb-1 overflow-hidden text-gray-600 dark:text-gray-400 text-sm md:text-md mt-1">{capitalizeFirstLetter(product.category_id.category_name)}</div>
      </div>

    </>

  )
}


const ProductCardRating = ({ product }) => {
  return (
    <div className="flex gap-1 text-lg my-3">
      <RatingStars product={product} />
    </div>
  )
}

export default ProductCard