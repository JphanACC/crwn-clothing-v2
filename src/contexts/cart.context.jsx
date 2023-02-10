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

const removeCartItem = (cartItems, productToRemove) => {
    //returns a boolean value
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id)
    //console.log(existingCartItem);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id != productToRemove.id)
    }

    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
            //spread through the list, set quantity -1 to the matched cartItem
            { ...cartItem, quantity: cartItem.quantity - 1 }
            //otherwise, return the cart item as is
            : cartItem)
    }
}

const clearCartItem = ( cartItems, cartItemToclear ) => (cartItems.filter(cartItem => cartItem.id != cartItemToclear.id)) 

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cartCount: 0,
    clearItemFromCart: () => {},
    total: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    //NOTE update quantity
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])
    //NOTE update total price
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemtoCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart = (cartItemToclear) => {
        setCartItems(clearCartItem(cartItems, cartItemToclear));
    }

    const value = { isCartOpen, setCartOpen, addItemtoCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}