import {CartIconContainer, ShoppingIcon, ItemCount} from "./cart-icon.styles";
import { useContext } from "react";
import {CartContext} from "../../contexts/cart.context";

function CartIcon(){
    const {isCartOpen, setIsCartOpen, itemCount} = useContext(CartContext);

    function toggleCart(){
        setIsCartOpen(!isCartOpen);
    }

    return(
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{itemCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;