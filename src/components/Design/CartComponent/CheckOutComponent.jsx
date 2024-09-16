import { checkOut } from "@/lib/features/order";
import { useRouter } from "next/navigation";

const CheckOutComponent = ({ items, total, userId, fetchCartItems, dispatch }) => {
  const router = useRouter();
  const handleCheckout = async () => {
    const confirm = window.confirm('Are you sure to place the order?')
    if (confirm) {
      const res = await dispatch(checkOut(userId));
      if (res.payload.success) {
        alert('Order Placed successfully');
        router.push('/profile/orders')
      } else {
        alert('Unexpected Error Occured');
      }
      dispatch(fetchCartItems(userId));
    }
  }

  return (
    <>
      <div className="w-full p-3 dark:border-gray-700 dark:border-2 lg:p-5 rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <OrderSummary items={items} total={total}/>
        <CheckOutFooter handleCheckout={handleCheckout}/>
      </div>
    </>
  )
}

export default CheckOutComponent

const OrderSummary = ({items,total}) =>{
  return (
      <>
              <h1 className='text-md font-bold lg:text-xl  mb-4'>Order Summary</h1>
        <div className="font-semibold border p-2 border-solid border-blueGray-200 dark:border-gray-700 rounded-b mb-4 text-sm lg:text-md">
          {
            items.map((item, index) => (
              <>
                <div key={index}  className="w-full flex justify-between my-2">
                  <div>{item.product_id.product_name}</div>
                  <div>Rs. {item.product_id.price} * {item.quantity}</div>
                </div>
              </>
            ))
          }
        </div>
        <div className="flex justify-between mx-2 py-2  border-b text-sm lg:text-lg border-gray-400 ">
          <h1 className="font-semibold">Total</h1>
          <h1 >Rs. {total}</h1>
        </div>
      </>
  )
}

const CheckOutFooter = ({handleCheckout}) =>{
  return (
    <div className="px-1 ">
    <button className="w-full bg-blue-500 my-3 hover:bg-blue-700 text-white font-semibold md:font-bold py-2 rounded"
      onClick={handleCheckout}
    >
      Checkout
    </button>
    </div>
  )
}