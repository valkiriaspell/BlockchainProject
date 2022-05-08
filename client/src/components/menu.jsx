import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {NavLink, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { firebaseCerrarSesion } from '../utils/Firebase';
import { loginUser } from '../redux/actions';
import { BsDoorOpenFill } from "react-icons/bs"
import { BsPersonCircle } from "react-icons/bs"


function Menu() {

    const dispatch = useDispatch();
	const history = useHistory();

    const autenticado = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    
    useEffect(() => {
        dispatch(loginUser(email))		
	}, []);
    const {user} = useSelector((state) => state)

    async function handleSignOut(e) {
		e.preventDefault();
		await firebaseCerrarSesion();
		localStorage.clear();
		history.push('/');
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
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home/mywallets">My Wallets</a>
                        </li><li className="nav-item">
                            <a className="nav-link disabled" href="#">About</a>
                        </li>
                    </ul>                   
                </div>               
                <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <BsPersonCircle></BsPersonCircle>                        <span className="navbar-text" >¡Hi, {user.userName}! </span>
                        </li>                        
                        <li className="nav-item">
                            <a className="nav-link" href="#"><BsDoorOpenFill></BsDoorOpenFill></a>                        
                        </li>
                    </ul>                     
            </nav>
        </div>

    );
}

export default Menu;