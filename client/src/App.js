
import './App.css';
import Home from './components/home';
import SignUpFirebase from './components/signUpFirebase';
import { config } from './utils/Firebase';
import { initializeApp } from 'firebase/app';
// import { Route } from 'react-router-dom';
import { Switch, Route } from "react-router";
import Login from './components/login';

initializeApp(config);

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/signup' component={SignUpFirebase} />
      <Route exact path='/home'>
        <Home></Home>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
