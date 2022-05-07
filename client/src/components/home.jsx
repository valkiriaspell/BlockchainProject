import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {
	firebaseLogin,	
	firebaseLoginGoogle,
} from '../utils/Firebase';
import Google from './images/google.png';
import Contraseña from './images/unlock.png';
import Email from './images/email.png';
import Arrow from './images/arrow.png';
import Perfil from './images/user.png';
import {useDispatch} from 'react-redux';
import {loginUser, userToken} from '../redux/actions';
import Swal from "sweetalert2";
import { saveUser } from '../redux/actions';
import { useHistory } from 'react-router';

function Home() {
    const dispatch = useDispatch();
	const history = useHistory();

    const [input, setInput] = useState({
		email: '',
		password: '',
	});

    

	function handleOnChange(e) {
		setInput({...input, [e.target.name]: e.target.value});
	}

    async function handleLogin(e) {
		e.preventDefault();
		

		
			const login = await firebaseLogin(input.email, input.password);
			if (login?.accessToken) {
				if (login.emailVerified === true) {
					await dispatch(loginUser(input.email));
					dispatch(userToken(login.accessToken));
					localStorage.setItem('email', login.email);
					localStorage.setItem('token', login.accessToken);
					history.push('/home');
				} else {
					return Swal.fire({
						title: `Por favor, verifique su cuenta para poder ingresar`,
						icon: 'warning',
						confirmButtonText: 'OK',
						heightAuto: false,
						backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                  `,
					});
				}
			} 	
	}

	async function handleLoginGoogle() {
		const iniciarSesion = await firebaseLoginGoogle();
		if (iniciarSesion.accessToken) {
			await dispatch(
				saveUser({
					userName: iniciarSesion.displayName,
					email: iniciarSesion.email,					
				})
			);
			localStorage.setItem('email', iniciarSesion.email);
			localStorage.setItem('token', iniciarSesion.accessToken);
			history.push('/home');
		} 
	}
	
    return (
		<div>
			
			<div className='containerLogin'>
				
				<div className='contentLogin'>
					<form onSubmit={handleLogin}>
						<div className='imgUser'>
							<img src={Perfil} alt='User' width={60} />
						</div>
						<div className='input'>
							<img src={Email} alt='Email' width={22} />
							<input
								name='email'
								type='email'
								placeholder='Email'
								value={input.email}
								onChange={(e) => handleOnChange(e)}
							/>
						</div>
						<div className='input'>
							<img src={Contraseña} alt='Contraseña' width={20} />
							<input
								name='password'
								type='password'
								placeholder='Contraseña'
								value={input.password}
								onChange={(e) => handleOnChange(e)}
							/>
						</div>
						<button className='buttonLogin' type='submit'>
							Ingresar
						</button>
						<NavLink className='linkContraseña' to={'recuperarcontrasena'}>
							¿Olvidaste tu contraseña?
						</NavLink>
					</form>
					<div className='contentLogin2'>
						<img src={Arrow} alt='Arrow' className='imgArrow' width={27} />
						<Link className='buttonSingUP' to={'/signup'}>
							Registrarse
						</Link>
						<button onClick={handleLoginGoogle}>
							Ingresar con Google <img src={Google} width={20} alt='Google' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;