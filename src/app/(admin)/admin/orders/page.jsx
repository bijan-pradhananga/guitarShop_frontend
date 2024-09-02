'use client'
import PageNumber from "@/components/hero/PageNumber"
import TableLoader from "@/components/Loader/TableLoader"
import { cancelOrder, fetchOrders, updateOrder } from "@/lib/features/order"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"

const Page = ({ searchParams }) => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector((state) => state.order)

    let currPage = 1;
    if (searchParams.page > 1) {
        currPage = Number(searchParams.page)
    }


    let pgNos = []
    for (let index = currPage - 3; index < currPage + 3; index++) {
        if (index < 1) continue
        if (index > orders.totalPages) break;
        pgNos.push(index)
    }

    const handleCancelOrder = async (id) => {
        let confirm = window.confirm("Are you sure you want to cancel this order?");
        if (confirm) {
            const result = await dispatch(cancelOrder(id));
            if (cancelOrder.fulfilled.match(result)) {
                dispatch(fetchOrders(currPage))
                alert('Order Updated Successfully');
            } else {
                alert('Unexpected Error Occured');
            }
        }
    }

    const handleUpdateOrder = async (id,formData) => {
        let confirm = window.confirm("Are you sure you want to confirm this ordder?");
        if (confirm) {
            const result = await dispatch(updateOrder({id,formData}));
            if (updateOrder.fulfilled.match(result)) {
                dispatch(fetchOrders(currPage))
                alert('Order Updated Successfully');
            } else {
                alert('Unexpected Error Occured');
            }
        }
    }


    useEffect(() => {
        dispatch(fetchOrders(currPage));
    }, [dispatch, currPage])


    return (
        <>
            <OrderHeader />
            <OrderTable orders={orders} pgNos={pgNos} searchParams={searchParams} handleCancelOrder={handleCancelOrder} handleUpdateOrder={handleUpdateOrder}/>
        </>
    )
}


const OrderHeader = () => {
    return (

        <div className="bg-gray-50 dark:bg-gray-800 rounded mb-4 p-5 flex justify-between gap-4">
            <div className='text-2xl font-bold'>
                Orders
            </div>
        </div>
    )
}

const OrderTable = ({ orders, pgNos, searchParams,handleCancelOrder,handleUpdateOrder }) => {
    return (
        <>
            {orders.isLoading ? (
                // Show loading indicator
                <TableLoader />
            ) : (
                <>
                    {orders.data.length === 0 ? (
                        <div>No Order Found</div>
                    ) : (
                        // Render products
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border dark:border-gray-800">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">User ID</th>
                                    {/* <th scope="col" className="px-6 py-3">User Name</th> */}
                                    <th scope="col" className="px-6 py-3">Product Details</th>
                                    <th scope="col" className="px-6 py-3">Total Price</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((order) => (
                                    <tr key={order._id} className="border-b dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{order._id}</td>
                                        <td className="px-6 py-4">{order.user_id._id}</td>
                                        {/* <td className="px-6 py-4">{order.user_id.first_name} {order.user_id.last_name}</td> */}
                                        <td className="px-6 py-4">
                                            <ul>
                                                {order.items.map((item) => (
                                                    <li key={item.product_id._id} className="mb-2">
                                                        <div className="flex items-center">
                                                            {/* <img src={item.product_id.product_image} alt={item.product_id.product_name} className="w-10 h-10 mr-2" /> */}
                                                            <div>
                                                                <p className="text-gray-900 dark:text-white">{item.product_id.product_name}</p>
                                                                <p className="text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                                                                <p className="text-gray-500 dark:text-gray-400">Price: Rs.{item.price}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4">Rs.{order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4">{order.status}</td>
                                        <td className="px-6 py-4">
                                            {order.status == "Pending"?(
                                            <>
                                                <span
                                                    className="font-medium text-green-500 dark:text-green-500 hover:underline cursor-pointer mr-2"
                                                onClick={() => { handleUpdateOrder(order._id,{status:"Confirmed"}) }}
                                                >
                                                    Confirm
                                                </span>
                                                <span
                                                    className="font-medium text-red-500 hover:underline cursor-pointer "
                                                onClick={() => { handleCancelOrder(order._id) }}
                                                >
                                                    Cancel
                                                </span>
                                            </>
                                            ):(
                                                <div>No Further Actions Available</div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className='w-full font-semibold flex justify-center px-5 gap-2  mt-4 md:px-0 md:w-3/4 md:mx-auto md:gap-3 '>
                        <PageNumber pgNos={pgNos} searchParams={searchParams} name='orders' />
                    </div>
                </>
            )}
        </>
    );
}
export default Page