'use client'
import withAuth from "@/app/authProvider"
import OrderCardComponent from "@/components/Design/OrderCardComponent/OrderCardComponent";
import ProfileCard from "@/components/Design/ProfileComponent/ProfileCard";
import ProfileCollection from "@/components/Design/ProfileComponent/ProfileCollection";
import { fetchUserOrders } from "@/lib/features/order";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const orders = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders(user.data._id))
  }, [dispatch])

  return (
    <>
      <h1 className='text-xl font-bold md:text-2xl'>My Profile</h1>
      <div className="w-full md:flex md:gap-2 mt-3">
        <ProfileCard user={user.data} />
        <ProfileCollection user={user.data} />
      </div>
      <div className="w-full flex justify-between mt-5">
        <h1 className='text-xl font-bold '>My Orders</h1>
        <h1 className='text-gray-500 font-semibold '>
          <Link href='/profile/orders'>
            See All
          </Link>
        </h1>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 my-5 md:px-0 ">
        {orders.data.length === 0 ? (
          <div>No Orders Found</div>
        ) : (
          <>
            {orders.data.slice(0, 3).map((order, index) => (
              <OrderCardComponent key={index} order={order} />
            ))}
          </>
        )}

      </div>
    </>
  )
}

export default withAuth(Profile)