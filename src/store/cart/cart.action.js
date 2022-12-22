import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const addItemToCart = (cartItems, productToAdd)=>{
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove)=>{
    const newCartItems = removeItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear)=>{
    const newCartItems = clearItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const setIsCartOpen = (bool)=>{
    return createAction(CART_ACTION_TYPES.TOGGLE_CART,bool);
}