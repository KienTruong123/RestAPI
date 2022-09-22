import React, { useState, useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import Menu from './icon/menu.svg'
import Cart from './icon/cart-shopping.svg'
import Close from './icon/close.svg'


function Header() {
    const value = useContext(GlobalState)
    return (
        <header>
            <div className="logo" >
                <h1>
                    <Link to="/">VIE ÉLUSSE</Link>
                </h1>
            </div>
            <div className="navbar">
                <ul>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link>   <img src={Close} width="30" className='menu' alt='' /> </Link></li>
                </ul>

                <div className='cart-icon'>
                    <span>0</span>
                    <Link>   <img src={Cart} width="30" className='cart-icon' alt='' /> </Link>
                </div>
                <div className="menu">
                    <img src={Menu} width="30" alt='' />
                </div>
            </div>

        </header>
    )
}

export default Header