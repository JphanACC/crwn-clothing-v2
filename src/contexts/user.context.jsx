import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

//actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    //a function that just returns null
    setCurrentUser: () => null,
})

//actual component, is the provider
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value ={currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            //return unsubscribe
            if (user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}