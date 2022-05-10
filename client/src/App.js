
import './App.css';
import Home from './components/home';
import SignUpFirebase from './components/signUpFirebase';
import { config } from './utils/Firebase';
import { initializeApp } from 'firebase/app';
import { Route, Routes } from "react-router-dom";
import Login from './components/login';
import Menu from './components/menu';
import MyWallets from './components/myWallets';
import Calculator from './components/calculator';
import LandingPage from './components/landingpage';

initializeApp(config);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpFirebase />} />
        <Route path='/calculator' element={
          <>
          <Menu/>
        <Calculator />
        </>
        } />
        <Route path='/home' element={
        <>
        <Menu/>
        <Home/>
        </>
        }/>
        
        <Route path="/mywallets"element={
        <>
        <Menu/>
        <MyWallets/>
        </>
        }/>        
        
      </Routes>
    </div>
  );
}

export default App;
