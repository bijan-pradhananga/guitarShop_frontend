const CheckOutComponent = ({ items, total, setPopup}) => {
 
  return (
    <>
      <div className="w-full p-3 dark:border-gray-700 dark:border-2 lg:p-5 rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <OrderSummary items={items} total={total} />
        <CheckOutFooter setPopup={setPopup}  />
      </div>
    </>
  )
}

export default CheckOutComponent

const OrderSummary = ({ items, total }) => {
  return (
    <>
      <h1 className='text-md font-bold lg:text-xl  mb-4'>Order Summary</h1>
      <div className="font-semibold border p-2 border-solid border-blueGray-200 dark:border-gray-700 rounded-b mb-4 text-sm lg:text-md">
        {items.map((item, index) => (
          item.product_id ? ( // Check if product_id is populated
            <div key={index} className="w-full flex justify-between my-2">
              <div>{item.product_id.product_name}</div>
              <div>Rs. {item.product_id.price} * {item.quantity}</div>
            </div>
          ) : (
            <div key={index} className="w-full flex justify-between my-2">
              <div>Loading product details...</div>
            </div>
          )
        ))}
      </div>
      <div className="flex justify-between mx-2 py-2  border-b text-sm lg:text-lg border-gray-400 ">
        <h1 className="font-semibold">Total</h1>
        <h1 >Rs. {total}</h1>
      </div>
    </>
  )
}

const CheckOutFooter = ({ setPopup }) => {
  return (
    <div className="px-1 ">
      <button className="w-full bg-blue-500 my-3 hover:bg-blue-700 text-white font-semibold md:font-bold py-2 rounded"
        onClick={()=>{setPopup(true)}}
      >
        Checkout
      </button>
    </div>
  )
}