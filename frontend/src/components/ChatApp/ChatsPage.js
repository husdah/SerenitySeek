import { PrettyChatWindow } from "react-chat-engine-pretty";
import styles from '../../assets/css/chatApp.module.css';

const ChatsPage = (props) => {
  return (
    <div>
      <div className={styles.background}>
        <PrettyChatWindow
          projectId='8a483528-78c4-4959-ac96-729b7154fc87'
          username={props.user.username}
          secret={props.user.secret}
        />
      </div>
    </div>
  );
};

export default ChatsPage;