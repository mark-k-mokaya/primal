import "./cart-icon.styles.scss";
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import {CartContext} from "../../contexts/cart.context";

function CartIcon(){
    const {isCartOpen, setIsCartOpen, itemCount} = useContext(CartContext);

    function toggleCart(){
        setIsCartOpen(!isCartOpen);
    }

    return(
        <div className="cart-icon-container" onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{itemCount}</span>
        </div>
    );
}

export default CartIcon;