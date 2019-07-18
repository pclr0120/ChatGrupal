import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "./Constantes/routes";
import { UserContexto } from "./firebaseConf/ContextoF";
import { SignOutButton } from "./BotonCerrar";
// import Folios from "./Folios/Folios";
// import { Homelogin } from "../Paginas/Home";

//import { InicioChat } from "../Paginas/ChatHome2/HomeChat2";



export const Navigation = () => (
  
  <UserContexto.Consumer>
         
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
 
  </UserContexto.Consumer>
 
);

const NavigationAuth = () => (
<div>
<nav className="navbar navbar-dark bg-dark">
    {/* <Link className="btn btn-outline-primary" to={routes.CHATHOME}>
      Mi chat
    </Link> */}
    <div className="navbar-brand">
      <SignOutButton />
    </div>
    <div >
      Desarrollado por PCLR
    </div>
  </nav>



</div>
  
   


);

const NavigationNonAuth = () => (
 
 <nav className="navbar navbar-dark bg-dark">
    <Link className="navbar-brand" to={routes.HOMECHAT}>
      Iniciar Sesion
    </Link>
    <div>
      Desarrollado por PCLR
    </div>
    <Link className="btn btn-link" to={routes.RegistroUser}>
      Crear cuenta
    </Link>
  </nav>
    
 
 
);
