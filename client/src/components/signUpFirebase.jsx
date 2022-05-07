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
import { useHistory } from "react-router";

function SignUpFirebase() {
    const dispatch = useDispatch();    
    const history = useHistory();
  
    const [input, setInput] = useState({
      name: "",
      email: "",
      password: "",
    });

    function handleChange(e) {
       setInput({ ...input, [e.target.name]: e.target.value });    
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
            history.push("/login");
          } 
      }


  return (
    <div className="containerSingUp">    
    <div className="contentSingUp">
    <form onSubmit={handleRegister}>           
            <br></br>
            <div className="userImg">
              <img src={Perfil} alt="User" width={60} />
            </div>
            <div className="cotainerInput">
              <img src={User} alt="User" width={22} />
              <input
                name="name"
                type="text"
                placeholder="Nombre"
                value={input.name}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
            </div>

            <div className="cotainerInput">
              <img src={Email} alt="Email" width={23} />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={input.email}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
            </div>
            <div className="cotainerInput">
              <img src={Contraseña} alt="Contraseña" width={20} />
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={input.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button className="registerButton" type="submit">
              Registrarse
            </button>
          </form>
        </div>
      </div>    
  );
}

export default SignUpFirebase;