import React, { useState } from 'react';
import {
	firebaseLogin,
	firebaseLoginGoogle,
} from '../utils/Firebase';
import Google from './images/google.png';
import Perfil from './images/user.png';
import { useDispatch } from 'react-redux';
import { loginUser, userToken } from '../redux/actions';
import { saveUser } from '../redux/actions';
import { useNavigate } from 'react-router';
import { Form, Button, Container } from 'react-bootstrap'

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [input, setInput] = useState({
		email: '',
		password: '',
	});



	function handleOnChange(e) {
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	async function handleLogin(e) {
		e.preventDefault();

		const login = await firebaseLogin(input.email, input.password);
		if (login?.accessToken) {
			dispatch(loginUser(input.email));
			dispatch(userToken(login.accessToken));
			localStorage.setItem('email', login.email);
			localStorage.setItem('token', login.accessToken);			
			navigate('/home');
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
			navigate('/home');
		}
	}

	return (
		<div>

			<div >

				<div >
					<Form onSubmit={handleLogin}>
						<Container>
							<div >
								<img src={Perfil} alt='User' width={60} />
							</div>
							<Form.Group>
								<Form.Label>Email: </Form.Label>
								<Form.Control
									name='email'
									type='email'
									placeholder='Email'
									value={input.email}
									onChange={(e) => handleOnChange(e)}
								/>

							</Form.Group>
							<Form.Group>
								<Form.Label>Password: </Form.Label>
								<Form.Control
									name='password'
									type='password'
									placeholder='Contraseña'
									value={input.password}
									onChange={(e) => handleOnChange(e)}
								/>

							</Form.Group>
							<Form.Group>
								<br></br>
								<Button type='submit'>
									Login
								</Button>
							</Form.Group>
							<Form.Group>
							</Form.Group>

							<Form.Group>
								<br></br>
								<Button onClick={handleLoginGoogle}>
									Login with google <img src={Google} width={20} alt='Google' />
								</Button>
							</Form.Group>
						</Container>
					</Form>
					<a href="/signup">
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
}

export default Login;