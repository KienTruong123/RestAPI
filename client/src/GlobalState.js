import React, { createContext, useState } from 'react'
import ProductsAPI from './API/Products'
import UserAPI from './API/User'
import CategoriesAPI from './API/Categories'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    
    const state = {
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }
    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>)
}