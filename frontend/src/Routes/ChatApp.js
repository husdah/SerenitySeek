import { useState } from "react";

import ChatAuthPage from "../components/ChatApp/ChatAuthPage";
import ChatsPage from "../components/ChatApp/ChatsPage";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer/Footer'; 

function ChatApp() {
  const [user, setUser] = useState(undefined);

 /*  if (!user) {
    return <ChatAuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  } */

  return (
    <>
      <Navbar nothome='true' />

      {!user ?
        <ChatAuthPage onAuth={(user) => setUser(user)} />
        :
        <ChatsPage user={user} />
      }

      <Footer />
    </>
  );
}

export default ChatApp;