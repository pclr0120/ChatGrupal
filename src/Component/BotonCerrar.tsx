import * as React from "react";
import { auth } from "./firebaseConf";

export const SignOutButton = () => (
  <button className="btn btn-outline-danger"   onClick={auth.CerrarSesion}>
  Salir
  </button>
);
