'use client'
import TableLoader from "@/components/Loader/TableLoader"
import { fetchOrders } from "@/lib/features/order"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector((state) => state.order)

    useEffect(() => {
        dispatch(fetchOrders(1));
    }, [dispatch])
    return (
        <>
            <DashboardHeader />
            <DashboardStats/>
            <div>
                <div className='text-2xl font-bold mb-4'>
                    Latest Orders
                </div>
                <OrderTable orders={orders}/>
            </div>
        </>
    )
}

const DashboardHeader = () => {
    return (
        <div className='text-2xl font-bold mb-4'>
            Dashboard
        </div>
    )
}

const DashboardStats = () => {
    return (
        <div className="w-full flex gap-4 mb-5">
        <div className="flex-1 bg-gray-200 py-16 rounded"></div>
        <div className="flex-1 bg-gray-200 py-16 rounded"></div>
        <div className="flex-1 bg-gray-200 py-16 rounded"></div>
    </div>
    )
}

const OrderTable = ({ orders}) => {
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
                                                                <p className="text-gray-500 dark:text-gray-400">Price: ${item.price}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4">{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </>
    );
}


export default Dashboard