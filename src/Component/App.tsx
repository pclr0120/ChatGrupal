import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "./Constantes/routes";
import { Navigation } from "./Navegacion";
import {Homelogin}from '../Paginas/Home/';
import { FireConfig } from "./firebaseConf";
import { conAutenticacion } from "./firebaseConf/conAutenticacion";
import {Registro} from '../Paginas/RegistrarUser/IndexRegistro';
import { InicioChat } from "../Paginas/ChatHome2/HomeChat2";
//import { UsercontextoLogin } from "./Usercontexto";

//import Folios from "./Folios/Folios";
import 'bootstrap/dist/css/bootstrap.css';


class AppComponent extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      Usuario: null
    };
  }

  public componentDidMount() {
    FireConfig.auth.onAuthStateChanged(Usuario => {
      Usuario
        ? this.setState(() => ({ Usuario }))
        : this.setState(() => ({ Usuario: null }));
    });
  }

  public render() {
    return (
      

      
      <BrowserRouter>
        <div>
          
          <Navigation />
      
          <Switch>
          <Route exact={true} path={routes.HOMECHAT} component={Homelogin} />
            <Route exact={true} path={routes.RegistroUser} component={Registro} />
          <Route exact={true} path={routes.CHATHOME} component={InicioChat} />
    
          </Switch>
          

        </div>
      </BrowserRouter>
   
    );
  }
}

export const App = conAutenticacion(AppComponent);
