import { db } from "./FireConfig";
import uuid from "uuid";

// User API
export const CrearUsuario = (username: string) =>{
  db.ref(`users/${uuid()}`).set({
    username
  });
}

export const onceGetUsers = () => db.ref("users").once("value");

export const EnviarMensaje = (mensaje:string,usuario:string,fecha:string,fecha2:number) =>
  db.ref(`Mensajes/"${uuid()}`).set({
    mensaje,
    usuario,
    fecha,
    fecha2
   
  });




  export const GetUser = () => db.ref("users");
export const GetMensajes = () => db.ref("Mensajes");

