import './App.css';
import {Route} from 'react-router-dom'
import Home from './Components/Home/home';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/login';

function App() {  
  return (
    <div>
      <Route path="/" component={NavBar}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
    </div>
  );
}

export default App;
