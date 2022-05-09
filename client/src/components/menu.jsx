import React, {useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { firebaseCerrarSesion } from '../utils/Firebase';
import { getEthereumData, loginUser } from '../redux/actions';
import { BsDoorOpenFill } from "react-icons/bs"
import { BsPersonCircle } from "react-icons/bs"
import './home.modules.css'
import { useNavigate } from 'react-router';


function Menu() {

    const dispatch = useDispatch();
	const navigate = useNavigate();
    

    const autenticado = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    
    useEffect(() => {
        dispatch(loginUser(email))
        dispatch(getEthereumData())		
	}, []);

    const {user} = useSelector((state) => state)
    const etherData = useSelector((state) => state.ethPrices)

    async function handleLogout(e) {
		e.preventDefault();
		await firebaseCerrarSesion();
		localStorage.clear();
		navigate('/');
	}

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Blockchain</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home </NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/mywallets">My Wallets</NavLink>
                        </li><li className="nav-item">
                        <NavLink className="nav-link" to="/calculator">ETH Calculator</NavLink>
                        </li>
                    </ul>                   
                </div>               
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <span className="navbar-text" >1 ethereum = </span>
                </li>     
                <li className="nav-item">
                <span className="navbar-text" style={{marginLeft: 10 + "px"}} >${etherData.usd} /</span>
                </li>     
                <li className="nav-item">
                <span className="navbar-text" style={{marginLeft: 10 + "px", marginRight: 20 + "px" }}> €{etherData.eur}</span>
                </li>     
                        <li className="nav-item">
                        <BsPersonCircle></BsPersonCircle> <span className="navbar-text" >¡Hi, {user.userName}! </span>
                        </li>                  
                    </ul>                     
                            <button className="logOut" onClick={(e)=> handleLogout(e)}><BsDoorOpenFill></BsDoorOpenFill></button>                        
            </nav>
        </div>

    );
}

export default Menu;