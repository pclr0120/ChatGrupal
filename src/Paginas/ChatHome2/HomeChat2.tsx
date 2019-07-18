import * as React from "react";
import ChatHome from "../../Component/ChatHome/ChatHome";

import { conAutorizacion } from "../../Component/firebaseConf/ConAutorizacion";

const Chat = () => (
  <div>
     
   <header className="App-header">

<ChatHome/>
</header>
  
  </div>
);
const authCondition = (authUser: any) => !!authUser;
export const InicioChat = conAutorizacion(authCondition)(Chat);