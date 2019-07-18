import * as React from "react";
import { withRouter } from "react-router-dom";
import { FireConfig } from ".";
import { UserContexto } from "./ContextoF";
import * as routes from "../Constantes/routes";
interface InterfaceProps {
  history?: any;
}

export const conAutorizacion =(condition: any) => (Component: any) => {
  class ConAutorizacion  extends React.Component<InterfaceProps, {}> {

    public componentDidMount() {
      FireConfig.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          console.log("Sali");
          this.props.history.push(routes.HOMECHAT);
          console.log("Saliha");
        }
        console.log("Salih");
      });
    }

    public render() {
      return (
        <UserContexto.Consumer>
          {authUser => (authUser ? <Component /> : null)}
        </UserContexto.Consumer>
      );
    }
  }

  return withRouter(ConAutorizacion as any);
};
