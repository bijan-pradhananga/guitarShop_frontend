'use client'
import withAuth from "@/app/authProvider";
import OrderCardComponent2 from "@/components/Design/OrderCardComponent/OrderCardComponent2";
import OrderItemsPopup from "@/components/Design/PopupComponent/OrderItemsPopup";
import { fetchUserOrders } from "@/lib/features/order";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

const Order = () => {
  const dispatch = useAppDispatch();
  const [isOpen,setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const orders = useAppSelector((state) => state.order);
  const togglePopup = () => {
    setIsOpen(!isOpen);
};

  useEffect(() => {
    dispatch(fetchUserOrders(user.data._id))

  }, [dispatch])
  return (
    <>
      <h1 className='text-xl font-bold md:text-2xl'>My Orders</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 my-5 md:px-0 ">
        {orders.data.length === 0 ? (
          <div>No Orders Found</div>
        ) : (
          <>
            {orders.data.map((order, index) => (
              <OrderCardComponent2 key={index} order={order} user={user} dispatch={dispatch} togglePopup={togglePopup}/>
            ))}
          </>
        )}
      </div>
      {isOpen && <OrderItemsPopup togglePopup={togglePopup} items={orders.items}/>}
    </>
  )
}

export default withAuth(Order)