import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'



function App() {
  return (
    <div className="App">
      <h1>Movies - Subscriptions Web Site</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'  component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route path="/Dashboard" component={Dashboard}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
