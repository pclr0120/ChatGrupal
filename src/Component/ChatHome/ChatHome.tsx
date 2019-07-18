import * as React from "react";
import "./ChatHome.css";
//import * as routes from "../Constantes/routes";
import { db } from "../firebaseConf";
import logo from "../../logo.png";
import camara from "../../camara.svg";
import ListaMensajes from "../ListaMensajes/ListaMensajes";

//import { Link } from "react-router-dom";
interface InterfaceProps {
  usuario?: any;
  mensaje?: any;
  mensajes?: any[];
}
class MensajesChat {
  usuario: string = "";
  mensaje: string = "";
  fecha: string = "";
  fecha2: number = 0;
}
interface InterfaceState {
  // email: string;
  // error: any;
  usuario: string;
  mensaje: string;
  fecha: string;
  fecha2: number;
  // nombre: string;
  mensajes: MensajesChat[];
}

export default class ChatHome extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    usuario: "",
    mensaje: "",
    fecha: "",
    fecha2: 0,
    mensajes: []
  };

  //Asigna los valores de los props
  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  lista: MensajesChat[] = [];
  usuario: string = String(localStorage.getItem("Usuario"));
  fecha: string = "";
  fecha2: number = 0;
  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...ChatHome.INITIAL_STATE };
    this.onSubmit=this.onSubmit.bind(this);
    // this.onSubmit=this.onSubmit.bind(this);
  }


  ListUser:any[]=[];
  public onSubmit = (event: any) => {
    //alert(this.state.mensaje);

    if (
      this.state.mensaje !== " " &&
      this.state.mensaje !== "" &&
      this.state.mensaje.length > 0
    ) {
      this.fecha2 = Date.now();
      this.fecha =
        new Date().getDate() +
        "/" +
        new Date().getMonth() +
        "/" +
        new Date().getFullYear() +
        "  " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds();

      db.EnviarMensaje(
        this.state.mensaje,
        this.usuario,
        this.fecha,
        this.fecha2
      );
      this.setState({ mensaje: "" });
    }
    event.preventDefault();
  };
  private TotalMensajes: number = 0;
  componentDidMount() {


  db.GetUser().on("value",items=>{
    items.forEach(element => {
      this.ListUser.push(element);
    });
 
  });
    db.GetMensajes()
      .orderByChild("fecha2")
      .on("value", items => {
        this.lista = [];

        items.forEach(element => {
          var men = element.child("mensaje").val();
          var usuario = element.child("usuario").val();
          var fecha = element.child("fecha").val();
          // var fecha2 = element.child("fecha2").val();
          let m: MensajesChat = new MensajesChat();
          m.mensaje = men;
          m.usuario = usuario;
          m.fecha = fecha;
          this.lista.push(m);
        });
        this.TotalMensajes = this.lista.length;

        this.setState({ mensajes: [] });
        this.setState({ mensajes: this.lista });
      });
  }

  render() {
    const { mensaje } = this.state;
    const isInvalid = mensaje === "" || mensaje===" " || mensaje.length<1 ;

    return (
      <div className="Card card-body">
        <form onSubmit={event => this.onSubmit(event)}>
          {/* <UserContexto.Consumer>
         
         {valor =>(JSON.stringify(valor))}
      
       </UserContexto.Consumer> */}
          {/* <UsercontextoLogin.Consumer >{val=><li>{val}</li>}</UsercontextoLogin.Consumer> */}

          <div className="card Cuerpo0">
            <div className="card-header Titulo ">Chat Grupal</div>
            <div className="container">
              <div className="row">
               
                <div className="col">
                  <label className="TotalMensajes"> Mensajes:{this.TotalMensajes} </label>
                </div>
               
                <div className="col">
                  <label className="TotalMensajes">  Usuarios:{this.ListUser.length} </label>
                </div>
                <div className="col" />
                <div className="col" />
                <div className="col ">
                  
                  <div className="upload-btn-wrapper">
                    
                    <button className="btn btn-outline-primary" disabled>
                      {" "}
                      <img src={camara} alt="LOGO" className="camara" />
                    </button>
                    <input disabled type="file" name="myfile" />
                  </div>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item area">
                {<ListaMensajes mensajes={this.state.mensajes} />}
              </li>
              <li className="list-group-item">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <input
                        required
                        className="InputEnvio"
                        value={mensaje}
                        onChange={event => this.CambioProps(event, "mensaje")}
                        type="text"
                        placeholder="Escribe un mensaje..."
                      />
                    </div>
                    <div>
                      <div className="col">
                        <button
                          disabled={isInvalid}
                          className="btn btn-primary"
                          type="submit"
                        >
                          <img
                            src={logo}
                            alt="LOGO"
                            className="App-logoChatEnviar"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* <li className="list-group-item ">
                {error && <p className="Mensanje">{error.message}</p>}
              </li> */}
            </ul>
          </div>
        </form>
      </div>
    );
  }
  //Detecta los cambios en losp props
  private CambioProps(event: any, columnType: string): void {
    this.setState(ChatHome.propKey(columnType, (event.target as any).value));
  }
}
