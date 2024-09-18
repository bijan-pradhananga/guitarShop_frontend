'use client'
import withAuth from "@/app/authProvider"
import CartComponent from "@/components/Design/CartComponent/CartComponent";
import CheckOutComponent from "@/components/Design/CartComponent/CheckOutComponent";
import ProductPaymentPopup2 from "@/components/Design/PopupComponent/ProductPaymentPopup2";
import { fetchCartItems, removeFromCart } from "@/lib/features/cart";
import { initializeCheckOutPayment } from "@/lib/features/payment";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { checkOut } from "@/lib/features/order";
import { useRouter } from "next/navigation";

function CartPage() {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [popup, setPopup] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('');
  const user = useAppSelector((state) => state.user.data);
  const { items, total, isLoading } = useAppSelector((state) => state.cart);
  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchCartItems(user._id));
    }
  }, [dispatch, user]);

  const handleRemoveFromCart = async (product_id) => {
    const cartData = { product_id, user_id: user._id };
    const result = await dispatch(removeFromCart(cartData));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(fetchCartItems(user._id));
      alert('Product removed from cart successfully');
    } else {
      alert('Failed to remove product from cart');
    }
  }

  const handleCashPayment = async () =>{
    const res = await dispatch(checkOut(user._id));
    if (res.payload.success) {
      alert('Order Placed successfully');
      router.push('/profile/orders')
    } else {
      alert('Unexpected Error Occured');
    }
  }

  const handleEsewaPayment = async () =>{
    const res2 = await dispatch(initializeCheckOutPayment({
      user_id: user._id,
    }));
    if (res2.payload.success) {
      // Step 4: Redirect user to eSewa with payment details
      const { payment, order } = res2.payload;
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
        "secret_key": '8gBm/:&EnhH.1/q'
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
    if (paymentMethod === 'cod') {
      //  Handle Cash on Delivery order
      handleCashPayment();
    } else {
      //  Handle eSewa payment initialization
      handleEsewaPayment();
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="md:flex md:w-3/4 gap-2 md:mx-auto">
        <h1 className='text-xl px-5 md:px-0 mt-4 font-bold md:text-2xl mb-2'>Your Cart</h1>
      </div>
      <div className="md:flex px-5 md:w-3/4 gap-2 md:px-0 md:mx-auto">
        {/* Cart Part  */}
        <div className="w-full flex flex-col gap-3 my-5 md:px-0 ">
          {items.length > 0 ? (
            items.map((item, index) => (
              <CartComponent key={index} item={item} handleRemoveFromCart={handleRemoveFromCart} />
            ))
          ) : (
            <div className="h-20 md:h-96">Your cart is empty</div>
          )}
        </div>
        {/* Cart Part  */}
        {/* Checkout Part  */}
        {items.length > 0 && (
          <div className="w-full my-5 md:my-5 md:w-1/2">
            <CheckOutComponent items={items} total={total} setPopup={setPopup} />
          </div>
        )}

        {/* Checkout Part  */}
      </div>
      {popup && <ProductPaymentPopup2 setPopup={setPopup} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} handleOrder={handleOrder} />}
    </>
  );
}

export default withAuth(CartPage);
