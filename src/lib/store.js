import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/product'
import categoryReducer from './features/category'
import brandReducer from './features/brand'
import adminReducer from './features/admin'
import userReducer from './features/user'
import cartReducer from './features/cart'
import wishlistReducer from './features/wishlist'
import orderReducer from './features/order'
import paymentReducer from './features/payment'

export const makeStore = () => {
  return configureStore({
    reducer: {
        admin:adminReducer,
        product: productReducer,
        category: categoryReducer,
        brand:brandReducer,
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order:orderReducer,
        payment:paymentReducer
    }
  })
}