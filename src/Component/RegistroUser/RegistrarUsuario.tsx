import * as React from "react";


import * as routes from "../Constantes/routes";
import { auth } from "../firebaseConf";
import "./RegistroUsuario.css"
interface InterfaceProps {
  nombre?: string;
  email?: string;
  error?: any;
  history?: any;
  password?: string;
}

interface InterfaceState {
  nombre: string;
  email: string;
  error: any;
  password: string;
  password2: string;
}

export default class ResgistroUsuario extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    nombre: "",
    email: "",
    error: null,
    password: "",
    password2: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...ResgistroUsuario.INITIAL_STATE };
  }

  public onSubmit = (event: any) => {
    const { email, password} = this.state;

    const { history } = this.props;

    auth
      .CrearUsuario(email, password)
      .then(() => {
        this.setState(() => ({ ...ResgistroUsuario.INITIAL_STATE }));
        history.push(routes.HOMECHAT);
      })
      .catch(error => {
        this.setState(ResgistroUsuario.propKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, password2, error, nombre } = this.state;

    const isInvalid = password !== password2 || email === "" || nombre === "";
    const Passdiff = password !== password2;        
    let Mensajediffpass;
    if (Passdiff && password2.length === password.length ) Mensajediffpass = <h4 className="MsjInvalid">Las contraseñas no coinciden</h4>;
    return (
      <div className="Card card-body">
        <form onSubmit={event => this.onSubmit(event)}>
          <div className="card">
            <div className="card-header Titulo">Crear Cuenta </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <input
                  value={nombre}
                  onChange={event => this.setStateWithEvent(event, "nombre")}
                  type="text"
                  placeholder="Nombre Completo"
                />
              </li>
              <li className="list-group-item">
                <input
                  value={email}
                  onChange={event => this.setStateWithEvent(event, "email")}
                  type="email"
                  placeholder="Cuenta"
                />
              </li>
              <li className="list-group-item">
                <input
                  value={password}
                  onChange={event => this.setStateWithEvent(event, "password")}
                  type="password"
                  placeholder="Contraseña"
                />
              </li>
              <li className="list-group-item">
                <input 
                  value={password2}
                  onChange={event => this.setStateWithEvent(event, "password2")}
                  type="password"
                  placeholder="Confirmar contraseña.."
                />
              </li>

              <li className="list-group-item Regristro">{Mensajediffpass}</li>

              <li className="list-group-item">
                <button
                  disabled={isInvalid}
                  className="btn btn-primary btn-block"
                  type="submit"
                >
                  Crear
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
    this.setState(ResgistroUsuario.propKey(columnType, (event.target as any).value));
  }
}
