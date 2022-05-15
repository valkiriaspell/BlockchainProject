import React, { useState } from "react";
import {
  firebaseRegistrarUsuario,
} from "../utils/Firebase";
import Contraseña from './images/unlock.png';
import Email from './images/email.png';
import Perfil from './images/user.png';
import User from './images/user.png';
import { useDispatch } from "react-redux";
import { saveUser } from "../redux/actions";
import { useNavigate } from "react-router";
import { Container, Form, Button } from "react-bootstrap";

function SignUpFirebase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input.name, input.email)
  }


  async function handleRegister(e) {
    e.preventDefault();

    dispatch(
      saveUser({
        userName: input.name,
        email: input.email,
      })
    );
    const registrar = await firebaseRegistrarUsuario(
      input.email,
      input.password
    );
    if (registrar.accessToken) {
      navigate("/login");
    }
  }


  return (
    <div >
      <div >
        <Form onSubmit={handleRegister}>
          <Container style={{ maxWidth: 18 + "rem", justifyContent: "center" }}>
            <br></br>
            <div >
              <img src={Perfil} alt="User" width={60} />
            </div>
              <Form.Label style={{ marginTop: 0.5 + "rem" }} >Username: </Form.Label>
            <Form.Group className="mb-3" >
              <Form.Control
                name="name"
                type="text"
                placeholder="Nombre"
                value={input.name}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Label style={{ marginTop: 0.5 + "rem" }}   >Email: </Form.Label>
            <Form.Group>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={input.email}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Label style={{ marginTop: 0.5 + "rem" }} >Password: </Form.Label>
            <Form.Group>
              <Form.Control
                name="password"
                type="password"
                placeholder="Contraseña"
                value={input.password}
                onChange={(e) => handleChange(e)}
              />

            </Form.Group>
            <Button type="submit" style={{ maxWidth: 18 + "rem", marginTop: 1 + "rem" }}>
              Registrarse
            </Button>
          </Container>
        </Form>
      </div>
    </div>
  );
}

export default SignUpFirebase;