
import './App.css';
import Home from './components/home';
import SignUpFirebase from './components/signUpFirebase';
import { config } from './utils/Firebase';
import { initializeApp } from 'firebase/app';
// import { Route } from 'react-router-dom';
import { Switch, Route } from "react-router";
import Login from './components/login';
import Menu from './components/menu';

initializeApp(config);

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/signup' component={SignUpFirebase} />
      <Route exact path='/home'>        
      <Menu></Menu>
        <Home></Home>
      </Route>      
      <Route path="/home/mywallets">
      <Menu></Menu>
      </Route>    
      </Switch>
    </div>
  );
}

export default App;
