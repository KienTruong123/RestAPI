import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Products from './products'  
import Details from './productDetails'  
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound'

function Main() {
    return (
    <Routes>
        <Route path="/" exact element={<Products/>} />
        <Route path="/detail/:id" exact element={<Details/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/register" exact element={ <Register/>} />
        <Route path="/cart" exact element={<Cart/>} />
        <Route path="*" exact element={<NotFound/>} />
    </Routes>
    )
}

export default Main