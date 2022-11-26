import {createContext, useState, useEffect} from "react";

function addCartItem(cartItems, productToAdd){
    // check if productToAdd already exists in cart Items
    // Increment if found
    // return new array with modified cartItems/ new cart item
		const existingCartItem = cartItems.find(item=>item.id===productToAdd.id);
		if(existingCartItem){
            const updatedCartItem = {...existingCartItem, quantity: existingCartItem.quantity+1};

            return cartItems.map(item=>
                item===existingCartItem ? updatedCartItem : item
            );
		}else{
			return [...cartItems, {...productToAdd, quantity: 1}]; // add new cart item
		}
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    itemCount: 0,
});

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const[itemCount, setItemCount] = useState(0);

    
    useEffect(()=>{
        const newItemCount = cartItems.reduce((total, item)=> total += item.quantity, 0);
        setItemCount(newItemCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, itemCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}