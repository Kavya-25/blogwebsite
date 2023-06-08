import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <nav className="navbar">
    {/* <img src="/images/blogalback.png" alt="" />/ */}
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to ='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      <li><Link to ='/logout'>Logout</Link></li>
    </ul>
</nav>
  )
}


