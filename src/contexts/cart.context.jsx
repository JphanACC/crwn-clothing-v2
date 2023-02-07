import { createContext, useState } from "react";

import React from 'react'

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const value = { isCartOpen, setCartOpen};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}