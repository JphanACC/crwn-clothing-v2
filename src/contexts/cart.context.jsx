import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //returns a boolean value
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)
    //console.log(existingCartItem);

    if (existingCartItem) {
        //if id of productToAdd is same as existing cartItems
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            //spread through the list, add quantity +1 to the matched cartItem
            { ...cartItem, quantity: cartItem.quantity + 1 } 
            //otherwise, return the cart item as is
            : cartItem)
    }

    //return an array with a product with property quantity 1.
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])
    
    const addItemtoCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
        //console.log("context hit")
        //console.log(cartItems);
    }
    
    const value = { isCartOpen, setCartOpen, addItemtoCart, cartItems, cartCount };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}