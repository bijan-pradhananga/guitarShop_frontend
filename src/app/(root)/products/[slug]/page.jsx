'use client'
import ProductNotFound from "@/components/Design/NotFoundComponent/ProductNotFound";
import ProductPaymentPopup from "@/components/Design/PopupComponent/ProductPaymentPopup";
import AddToCartBtn from "@/components/hero/AddToCartBtn";
import WishListBtn from "@/components/hero/AddToWishlistBtn";
import BuyNowBtn from "@/components/hero/BuyNowBtn";
import OutOfStockComponent from "@/components/hero/OutOfStockComponent";
import ProductPageLoader from "@/components/Loader/PageLoader.jsx/ProductPageLoader";
import API from "@/config/config";
import { buyNow } from "@/lib/features/order";
import { fetchSingleProduct } from "@/lib/features/product";
import { checkAuth } from "@/lib/features/user";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initializePayment } from "@/lib/features/payment";

const ProductDetails = ({ params }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [popup, setPopup] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('');
    const product = useAppSelector((state) => state.product);
    const { paymentData, payLoading: loading, error } = useAppSelector((state) => state.payment);
    const { singleProductData: data, isLoading } = product;
    const [quantity, setQuantity] = useState(1);

    const handleCashPayment = async (user_id) => {
        const res2 = await dispatch(buyNow({
            product_id: data._id,
            user_id,
            quantity
        }));

        if (res2.payload.success) {
            alert('Order Placed successfully');
            router.push('/profile/orders');
        } else {
            alert('Unexpected error occurred');
        }
    }

    const handleEsewaPayment = async  (user_id) =>{
        const res3 = await dispatch(initializePayment({
            product_id: data._id, 
            user_id, 
            quantity 
        }));

        if (res3.payload.success) {
            // Step 4: Redirect user to eSewa with payment details
            const { payment, order } = res3.payload;

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';  // Replace with the correct eSewa URL

            const inputFields = {
                "amount": order.total,
                "failure_url": `http://localhost:3000/payment/failure?orderid=${order._id}`,
                "product_delivery_charge": "0",
                "product_service_charge": "0",
                "product_code": "EPAYTEST",
                "signature": payment.signature,
                "signed_field_names": payment.signed_field_names,
                "success_url": "http://localhost:3001/payment/complete-payment",
                "tax_amount": 0,
                "total_amount": order.total,
                "transaction_uuid": order._id,
                "secret_key":'8gBm/:&EnhH.1/q'
                }
            // Append input fields to the form
            for (const [key, value] of Object.entries(inputFields)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            }
            document.body.appendChild(form);
            form.submit();
        } else {
            alert('Unexpected error occurred');
        }
    }

    const handleOrder = async () => {
        // Step 1: Check if the user is authenticated
        const res = await dispatch(checkAuth());
        if (res.payload.success) {
            const user_id = res.payload.user._id;
            if (paymentMethod === 'cod') {
                // Step 2: Handle Cash on Delivery order
                handleCashPayment(user_id);
            } else {
                // Step 3: Handle eSewa payment initialization
                handleEsewaPayment(user_id);
            }
        } else {
            alert('Please Log In First');
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantity < data.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        dispatch(fetchSingleProduct(params.slug));
    }, [dispatch, params.slug]);


    if (isLoading) {
        return <ProductPageLoader />;
    }

    return (
        <>
            {data && data.category_id ? (
                <div className="w-full mt-4 px-5 lg:flex lg:gap-6 md:mb-10 md:px-0 md:w-3/5 lg:w-3/4 md:mx-auto">
                    <ProductImage data={data} API={API} />
                    <div className="flex flex-col p-2">
                        <ProductDescrption data={data} capitalizeFirstLetter={capitalizeFirstLetter} />
                        <ProductQuantityBtn data={data} quantity={quantity} handleDecreaseQuantity={handleDecreaseQuantity} handleIncreaseQuantity={handleIncreaseQuantity} />
                        <ProductHandleButtons data={data} quantity={quantity} setPopup={setPopup} />
                    </div>
                </div>
            ) : (
                <ProductNotFound />
            )}
            {popup && <ProductPaymentPopup quantity={quantity} product={data} setPopup={setPopup} handleOrder={handleOrder} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />}
        </>
    );
};

export default ProductDetails

const ProductImage = ({ data, API }) => {
    return (
        <div className="w-full lg:w-2/4 mb-4 ">
            <img src={`${API.defaults.baseURL}/products/${data.product_image}`}
                className="w-full p-2 aspect-square object-cover shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
            />
        </div>
    )
}

const ProductDescrption = ({ data, capitalizeFirstLetter }) => {
    return (
        <>
            <h1 className="text-2xl font-semibold mb-2">{data.product_name}</h1>
            <p className="mb-2 dark:text-gray-400">
                {data.description}
            </p>
            {/* <ProductRating product={data} /> */}
            <h2 className="font-semibold text-lg mb-1">Price: Rs.{data.price}</h2>
            <h2 className="font-semibold text-lg mb-1">Quantity: {data.quantity}</h2>
            <h2 className="dark:text-gray-400 font-semibold text-lg mb-1">
                Category: {capitalizeFirstLetter(data.category_id.category_name)}
            </h2>
            <h2 className="dark:text-gray-400 font-semibold text-lg mb-3">
                Brand: {capitalizeFirstLetter(data.brand_id.brand_name)}
            </h2>
        </>
    )
}

const ProductQuantityBtn = ({ handleDecreaseQuantity, handleIncreaseQuantity, quantity, data }) => {
    return (
        <div className="flex items-center gap-2 mb-3">
            <button
                onClick={handleDecreaseQuantity}
                className="px-3 py-1 border rounded-md border-gray-300"
                disabled={quantity <= 1}
            >
                -
            </button>
            <span>{quantity}</span>
            <button
                onClick={handleIncreaseQuantity}
                className="px-3 py-1 border rounded-md border-gray-300"
                disabled={quantity >= data.quantity}
            >
                +
            </button>
        </div>
    )
}

const ProductHandleButtons = ({ data, quantity, setPopup }) => {
    return (
        <>
            <div className="flex flex-col gap-2 mt-2 md:flex-row lg:mt-2 md:w-3/4 lg:w-2/4">
                {data.quantity === 0 ? (
                    <OutOfStockComponent />
                ) : (
                    <>
                        <AddToCartBtn product={data} quantity={quantity} />
                        <BuyNowBtn setPopup={setPopup} />
                    </>
                )}
            </div>
            <div className="mt-4">
                <WishListBtn product={data} />
            </div>
        </>
    )
}

