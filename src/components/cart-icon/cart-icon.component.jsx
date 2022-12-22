import {CartIconContainer, ShoppingIcon, ItemCount} from "./cart-icon.styles";

import { useDispatch, useSelector } from "react-redux";
import {selectIsCartOpen, selectCartCount} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";

function CartIcon(){
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    function toggleCart(){
        dispatch(setIsCartOpen(!isCartOpen));
    }

    return(
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;