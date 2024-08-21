'use client'
import { buyNow } from "@/lib/features/order";
import { checkAuth } from "@/lib/features/user";
import { useAppDispatch } from "@/lib/hooks";

const BuyNowBtn = ({product,fetchSingleProduct,quantity}) => {
  const dispatch = useAppDispatch();

    const handleBuyNow = async () => {
      const confirm = window.confirm('Are you sure to place the order?')
      if (confirm) {
        const res = await dispatch(checkAuth())
        if (res.payload.success) {
            const user_id = res.payload.user._id 
            await dispatch(buyNow({ product_id: product._id, user_id:user_id, quantity }));
            alert('Order Placed successfully');
            dispatch(fetchSingleProduct(product._id));
        }
        else {
            alert('Please Log In First');
        }
      }

  };
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold md:font-bold p-2 rounded"
    onClick={handleBuyNow}
    >
        Buy Now
    </button>
  )
}

export default BuyNowBtn