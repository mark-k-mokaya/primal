import {createContext, useState, useEffect} from "react";

function addCartItem(cartItems, productToAdd){
		const existingCartItem = cartItems.find(item=>item.id===productToAdd.id);
		if(existingCartItem){
            const updatedCartItem = {...existingCartItem, quantity: existingCartItem.quantity+1};

            return cartItems.map(item=>
                item===existingCartItem ? updatedCartItem : item
            );
		}else{
			return [...cartItems, {...productToAdd, quantity: 1}];
		}
}

function removeItem(cartItems, cartItemToRemove){
    const existingCartItem = cartItems.find(item=>item.id===cartItemToRemove.id);

    if(existingCartItem.quantity === 1){
        return cartItems.filter((item)=>item!==cartItemToRemove);
    }else{
        const updatedCartItem = {...existingCartItem, quantity: existingCartItem.quantity-1};
        return cartItems.map(item=>item===existingCartItem ? updatedCartItem : item);
    } 
}

function clearItem(cartItems, cartItemToClear){
    return cartItems.filter(item=>item!==cartItemToClear);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
    itemCount: 0,
    cartTotal: 0
}); 

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    
    useEffect(()=>{
        const newItemCount = cartItems.reduce((accumulator, item)=> accumulator + item.quantity, 0);
        setItemCount(newItemCount);
    }, [cartItems]);

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((accumulator, item)=> accumulator + item.quantity * item.price , 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove)=>{
        setCartItems(removeItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear)=>{
        setCartItems(clearItem(cartItems, cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, itemCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}