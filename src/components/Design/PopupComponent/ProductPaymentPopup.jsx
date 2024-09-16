'use client'
import { FaXmark } from 'react-icons/fa6';
const ProductPaymentPopup = ({ product, quantity, paymentMethod, setPopup, setPaymentMethod, handleOrder }) => {
    // Handler for when the radio input changes
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const confirm = window.confirm('Are you sure to place the order?')
        if (confirm) {
            handleOrder();
        }
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-11/12 my-6 mx-auto md:w-96">
                <div className="border rounded shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900  dark:border-gray-500  outline-none focus:outline-none">
                    <Header setPopup={setPopup} />
                    <OrderDetails product={product} quantity={quantity}/>
                    <PaymentForm
                        paymentMethod={paymentMethod} handlePaymentChange={handlePaymentChange} handleSubmit={handleSubmit}
                    // formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

const Header = ({ setPopup }) => {
    return (
        <div className="flex justify-between items-center p-4 border-b border-solid border-blueGray-200 dark:border-gray-600 rounded-t">
            <h3 className="text-xl font-semibold">
                Order Summary
            </h3>
            <FaXmark className="font-bold text-500 text-xl cursor-pointer" onClick={() => setPopup(false)} />
        </div>
    )
}

const OrderDetails = ({ product,quantity}) => {
    return (
        <>
            <div className='w-full px-4 mt-2'>
                <h1 className='text-lg font-semibold my-2'>
                    Order Details
                </h1>
                <div className='grid grid-cols-2 border p-2 border-solid border-blueGray-200 dark:border-gray-700 rounded-b gap-y-1'>
                    <div>
                        {product.product_name}
                    </div>
                    <div className='text-right'>
                        Rs. {product.price}*{quantity}
                    </div>
                    <div className='font-semibold'>
                        Total
                    </div>
                    <div className='text-right'>
                        Rs. {product.price*quantity}
                    </div>
                </div>
            </div>
        </>
    )
}

const PaymentForm = ({ paymentMethod, handlePaymentChange, handleSubmit }) => {
    return (
        <form className="relative flex-auto mt-4"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-wrap mb-4">
                <div className="w-full px-4">
                    <h1 className='text-lg font-semibold my-2'>Payment Options</h1>
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mb-2 cursor-pointer">
                        <input id="bordered-radio-1" type="radio" name="payment" required
                            value="cod"  // Set value for Cash on Delivery
                            checked={paymentMethod === 'cod'}  // Check if selected
                            onChange={handlePaymentChange}  // Handle change
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                        />
                        <label htmlFor="bordered-radio-1"
                            className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                        >
                            Cash On Delivery
                        </label>
                    </div>
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 cursor-pointer">
                        <input id="bordered-radio-2" type="radio" name="payment" required
                            value="esewa"  // Set value for Esewa
                            checked={paymentMethod === 'esewa'}  // Check if selected
                            onChange={handlePaymentChange}  // Handle change
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="bordered-radio-2"
                            className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                        >
                            Esewa
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 dark:border-gray-700 rounded-b">
                <button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                >
                    Buy
                </button>
            </div>
        </form>
    )
}

export default ProductPaymentPopup