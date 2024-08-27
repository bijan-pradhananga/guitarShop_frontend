import API from "@/config/config"

const OrderCardComponent = ({order}) => {
    return (
      <div className="w-full flex gap-4 p-2 rounded dark:border-gray-700 dark:border-2  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <CartImgPart order={order.items}/>
        <CartInfoPart order={order}/>
      </div>
    )
  }
  
  const CartImgPart = ({order}) => {
    return (
      <div className="w-1/3 aspect-square p-1 ">
        <img src={`${API.defaults.baseURL}/products/${order[0].product_id.product_image}`}
        alt={order[0].product_id.product_name}
        className="w-full h-full object-cover rounded" />
      </div>
    )
  }
  
  const CartInfoPart = ({order}) => {
    return (
      <div className="w-4/6 p-1 flex flex-col justify-between text-sm lg:text-lg lg:p-3">
        <div>
          <div className="w-full md:flex justify-between">
            <h1 className="text-md lg:text-xl">{order._id}</h1>
            <h2>Rs. {order.total.toFixed(2)}</h2>
          </div>
        </div>

        <div className="w-full flex justify-between items-center ">
          <h1 >Items: {order.items.length}</h1>
          <h2 className="font-semibold text-gray-500">{order.status}</h2>
        </div>
      </div>
    )
  }
  
  export default OrderCardComponent