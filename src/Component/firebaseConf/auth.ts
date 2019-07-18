import { auth } from "./FireConfig";
import { db } from ".";




export const CrearUsuario = (
  email: string,
  password: string
) => auth.createUserWithEmailAndPassword(email, password).then(items=>{
  db.CrearUsuario(email);
});


export const IniciarSesion = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);


export const CerrarSesion = () => auth.signOut();


export const doPasswordReset = (email: string) =>
  auth.sendPasswordResetEmail(email);


export const ActulizarPass = async (password: string) => {
  if (auth.currentUser) {
    await auth.currentUser.updatePassword(password);
  }
  throw Error("Usuario no autorizado!");
};
