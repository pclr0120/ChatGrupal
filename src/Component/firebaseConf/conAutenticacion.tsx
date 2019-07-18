import * as React from "react";
import { FireConfig } from ".";
import { UserContexto } from "./ContextoF";

interface InterfaceProps {
  authUser?: any;
}

interface InterfaceState {
  authUser?: any;
}

export const conAutenticacion = (Component: any) => {
  class ConAutenticacion extends React.Component<
    InterfaceProps,
    InterfaceState
  > {
    constructor(props: any) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    public componentDidMount() {

        FireConfig.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));

      });
    }

    public render() {
      const { authUser } = this.state;

      return (
        <UserContexto.Provider value={authUser}>
          <Component />
        </UserContexto.Provider>
      );
    }
  }
  return ConAutenticacion;
};
