'use client'

const BuyNowBtn = ({ setPopup }) => {

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold md:font-bold p-2 rounded"
      onClick={() => setPopup(true)}
    >
      Buy Now
    </button>
  )
}

export default BuyNowBtn