import API from "@/config/config"

const OrderItemComponent = ({item}) => {
    return (
      <div className="w-full flex gap-4 p-2 rounded dark:border-gray-700 dark:border-2  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <ItemImage item={item}/>
        <ItemInfo item={item}/>
      </div>
    )
  }
  
  const ItemImage = ({item}) => {
    return (
      <div className="w-1/3 aspect-square p-1 ">
        <img src={`${API.defaults.baseURL}/products/${item.product_id.product_image}`}
        alt={item.product_id.product_name}
        className="w-full h-full object-cover rounded" />
      </div>
    )
  }
  
  const ItemInfo = ({item}) => {
    return (
      <div className="w-4/6 p-1 flex flex-col justify-between text-sm lg:text-lg lg:p-3">
        <div>
          <div className="w-full">
            <h1 className="text-md lg:text-xl">{item.product_id.product_name}</h1>
            <h2>Rs. {(item.product_id.price * item.quantity).toFixed(2)}</h2>
          </div>
        </div>

        <div className="w-full flex justify-between items-center ">
          <h1 >Quantity: {item.quantity}</h1>
          {/* <h2 className="font-semibold text-gray-500">{item.status}</h2> */}
        </div>
      </div>
    )
  }
  
  export default OrderItemComponent