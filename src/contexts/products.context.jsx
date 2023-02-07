import { createContext, useState, useEffect } from 'react';

import PRODUCTs from '../utils/shop-data.json'

export const ProductsContext = createContext({
    products: [],
    setProducts: () => { },
})

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTs);
    const value = { products }

    return <ProductsContext.Provider value={value}> 
        {children} 
    </ProductsContext.Provider>
}
