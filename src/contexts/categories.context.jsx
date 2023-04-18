import { createContext, useState, useEffect } from 'react';

import SHOP_DATA from '../utils/shop-data.js'
//used this once only for TESTING purposes
//import { addCollectionAndDocument } from '../utils/firebase/firebase.utils.js';
//replace addCollection with getCollection so we can grab the data from Firestore instead
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
    //setProducts: () => { },
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    //automatically pass the SHOP_DATA as actual objects we are trying to add 
    //NOTE THIS IS ONE TIME EXAMPLE.
    // useEffect(() => {
    //     addCollectionAndDocument('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        //NOTE Better to make a separate async function instead of using Async in useEffect. Then invoke it.
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);
    
    return (
        <CategoriesContext.Provider value={value}> 
            {children} 
        </CategoriesContext.Provider>
    );
}
