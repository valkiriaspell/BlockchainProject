
import './App.css';
import Home from './components/home';
import SignUpFirebase from './components/signUpFirebase';
import { config } from './utils/Firebase';
import { initializeApp } from 'firebase/app';
import { Route } from 'react-router';

initializeApp(config);

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home} />
      <Route path='/signup' component={SignUpFirebase} />

    </div>
  );
}

export default App;
