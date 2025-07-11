import React from "react"
import Logo from '../assets/images/logo.png'
import { faInstagram } from "@fortawesome/free-brands-svg-icons"    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


export  default function Header(){
    return(
        <header className="header">
            <div className="spacer"></div>
            <div className="logo">
            <img src={Logo} alt="logo" />
            </div>
            <div className="socialLinks">
                <ul>
                <Link to='/'><li><FontAwesomeIcon icon={faHouse}/></li></Link>
                <Link to='https://www.instagram.com/karla_arroyave/' target='blank'><li><FontAwesomeIcon icon = {faInstagram} /></li></Link>
                <Link to='/contact'><li><FontAwesomeIcon icon = {faEnvelope} /></li></Link>
                <Link to='/shoppingCar'><li><FontAwesomeIcon icon = {faCartShopping} /></li></Link>
                <Link to='/profile'><li><FontAwesomeIcon icon={faUser} /></li> </Link>
                </ul>
            </div>
            
        </header>
        

    )
}