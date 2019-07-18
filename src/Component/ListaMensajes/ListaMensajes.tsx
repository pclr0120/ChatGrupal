import * as React from "react";

//import "./ChatHome.css";

import "./ListaMensajes.css";

//import { Link } from "react-router-dom";
interface InterfaceProps {
  mensajes: MensajesChat[];
}
class MensajesChat {
  usuario: string = "";
  mensaje: string = "";
  fecha: string = "";
  fecha2: number = 0;
}
interface InterfaceState {
  mensajes: MensajesChat[];
}

export default class ListaMensajes extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    mensajes: []
  };

  private scroll0: React.RefObject<HTMLDivElement> = React.createRef();
  usuario: string = String(localStorage.getItem("Usuario"));

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...ListaMensajes.INITIAL_STATE };
  }

  componentDidMount() {
    const node = this.scroll0.current;
    if (node) {
      console.log("holas");
      node.scrollTo(0, 500);
      node.scrollIntoView({
        block: "end",
        behavior: "smooth",
        inline: "nearest"
      });
    }
  }
  componentDidUpdate() {
    const node = this.scroll0.current;
    if (node) {
      node.scrollIntoView({
        block: "end",
        behavior: "smooth",
        inline: "nearest"
      });
    }
  }
  render() {
    // const { mensajes }: any = this.props.mensajes;

    return (
      <div>
        {this.props.mensajes.map((items, Keys) => {
          if (this.usuario !== items.usuario)
            return (
              <div ref={this.scroll0} key={Keys} className=" He  row">
                <div className=" col">
                  <div className="Cuerpo">
                    <div className=" row">
                      <label className="User">{items.usuario}</label>
                    </div>
                    <div className=" Mensaje row">
                      <p className="pa">{items.mensaje}</p>
                    </div>
                    <div className="  row">
                      <div className="col Fecha">{items.fecha}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          else
            return (
              <div ref={this.scroll0} key={Keys} className="row">
                <div className="col">
                  <div className="Cuerpo2">
                    <div className="row">
                      <label className="User">{items.usuario}</label>
                    </div>
                    <div className=" Mensaje row">
                      <p className="pa">{items.mensaje}</p>
                    </div>
                    <div className="  row">
                      <div className="col Fecha">{items.fecha}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    );
  }
}
