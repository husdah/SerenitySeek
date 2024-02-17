import { useState } from "react";

import ChatAuthPage from "../components/ChatApp/ChatAuthPage";
import ChatsPage from "../components/ChatApp/ChatsPage";

function ChatApp() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <ChatAuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default ChatApp;