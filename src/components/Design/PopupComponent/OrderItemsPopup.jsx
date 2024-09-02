'use client'

import OrderItemComponent from "../OrderCardComponent/OrderItemComponent";

const OrderItemsPopup = ({items,togglePopup}) => {
    
    return (
        <div className="flex justify-center items-center h-screen">
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={togglePopup}
                    ></div>

                    {/* Popup */}
                    <div className="bg-white dark:bg-gray-800 dark:text-white w-full max-w-md p-6 rounded-lg shadow-lg relative z-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                        {items.map((item,index)=>(
                            <OrderItemComponent key={index} item={item}/>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default OrderItemsPopup;
