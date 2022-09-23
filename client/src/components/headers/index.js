import React, { useState, useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import Menu from './icon/menu.svg'
import axios from 'axios'

const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.removeItem('firstLogin')
    window.location.href = "/";
}

const adminRouter = () => {
    return (
        <>
            <li><Link to="/category">Categories</Link></li>
            <li><Link to="/create_product">Create new product</Link></li>
        </>
    )
}

const loggedRouter = () => {
    return (
        <>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
        </>
    )
}

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <header>
            <div className="logo" >
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'VIE ÉLUESSE'}</Link>
                </h1>
            </div>
            <div className="navbar">
                <ul>
                    <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>
                    <li> <Link to="/cart">Cart</Link></li>
                    {isAdmin && adminRouter()}
                    {isLogged ? loggedRouter() : <li><Link to="/login">Login</Link></li>}
                </ul>
                <div className="menu">
                    <img src={Menu} width="30" alt='' />
                </div>
            </div>
        </header>
    )
}

export default Header