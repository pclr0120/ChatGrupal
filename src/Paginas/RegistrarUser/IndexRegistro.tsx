import * as React from "react";
import { withRouter } from "react-router-dom";
import ResgistroUsuario from "../../Component/RegistroUser/RegistrarUsuario";



const RegistrarUser = ({ history }: { [key: string]: any }) => (
  <div>
   
 
      
      <header className="App-header">

        <ResgistroUsuario  history={history}/>
      </header>
  
  </div>
);

export const Registro = withRouter(RegistrarUser);
