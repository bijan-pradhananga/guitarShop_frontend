import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { checkAuth } from "@/lib/features/user";
import { addToWishlist } from "@/lib/features/wishlist";
import { FaHeart } from "react-icons/fa";


const AddToWishlistBtn = ({product}) => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector((state) => state.wishlist);
    const handleAddToWishlist = async () => {
        const res = await dispatch(checkAuth())
        if (res.payload.success) {
            const user_id = res.payload.user._id 
            const response = await dispatch(addToWishlist({ product_id: product._id, user_id:user_id }));
            if (response.payload.success) {
                alert('Product Added To Wishlist');
            }else{
                alert('Product Already in Wishlist');
            }
        }
        else {
            alert('Please Log In First');
        }
    };
    return (
        <div onClick={handleAddToWishlist} className="flex gap-2 items-center text-md font-light cursor-pointer">
            <FaHeart className=""/> <p>Add to Wishlist</p> 
        </div>
    )
}

export default AddToWishlistBtn