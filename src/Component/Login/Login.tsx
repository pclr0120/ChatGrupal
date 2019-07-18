import * as React from "react";
import "./Login.css";

import * as routes from "../Constantes/routes";
import { auth } from "../firebaseConf";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';



interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  password: string;
}


export default class Login extends React.Component<
InterfaceProps,
InterfaceState
> {
private static INITIAL_STATE = {
  email: "",
  error: null,
  password: ""
};

private static propKey(propertyName: string, value: any): object {
  return { [propertyName]: value };
}

constructor(props: InterfaceProps) {
  super(props);

  this.state = { ...Login.INITIAL_STATE };
  
}
hola:any;
public onSubmit = (event: any) => {
  const { email, password } = this.state;
  localStorage.setItem('Usuario', email);
  const { history } = this.props;
 
  auth
    .IniciarSesion(email, password)
    .then(() => {
      this.setState(() => ({ ...Login.INITIAL_STATE }));
      localStorage.setItem('Usuario',email);
      history.push(routes.CHATHOME);
    })
    .catch(error => {
      this.setState(Login.propKey("error", error));
    });      
    console.log(email);

  event.preventDefault();
};

public componentDidMount() {


}
  render() {
    
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
     
      
      <div className="Card card-body"> 

                    
      <form onSubmit={event => this.onSubmit(event)}>
  
        <div className="card">
            <div  className="card-header Titulo">Chat Grupal Beta</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <input required
                      value={email}
                      onChange={event => this.setStateWithEvent(event, "email")}
                      type="email"
                      placeholder="Cuenta"
                    />
              </li>
                  <li className="list-group-item">
                    <input
                    required
                      value={password}
                      onChange={event => this.setStateWithEvent(event, "password")}
                      type="password"
                      placeholder="Contraseña"
                    />
                 </li>
                 <li className="list-group-item Regristro">
                   <Link to={routes.RegistroUser}>Registrarme</Link>
                   </li>
                
                  <li className="list-group-item">
                    <button disabled={isInvalid} className="btn btn-primary btn-block" type="submit">
                      Iniciar Sesion
                    </button>
                   </li>
               <li className="list-group-item ">    
        {error && <p className="Mensanje">{error.message}</p>}
        </li>
              </ul>

        </div>
    </form>
    
        </div>
        
    
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(Login.propKey(columnType, (event.target as any).value));
  }
   
  
}

