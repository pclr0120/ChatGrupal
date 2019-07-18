import * as React from "react";
import { withRouter } from "react-router-dom";
import Login from "../../Component/Login/Login";
import './Home.css';
import logo from '../../logo.png';

const Home = ({ history }: { [key: string]: any }) => (
  <div>
   
 
      
      <header className="App-header">
      <img src={logo} alt="LOGO" className="App-logo" ></img>
        <Login  history={history}/>
        
        <h1>Desarrollado por PCLR</h1>
    
      </header>
      
  </div>
);

export const Homelogin = withRouter(Home);
