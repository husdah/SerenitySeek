import { PrettyChatWindow } from "react-chat-engine-pretty";
import styles from '../assets/css/chatApp.module.css';

const ChatsPage = (props) => {
  return (
    <div className={styles.body}>

      <div className={styles.flex}>
        <div className={styles.flex_username}>User: {props.user.username}</div>
        <a href="/" className={styles.flex_link}>Back</a>
      </div>

      <div className={styles.background}>
        <PrettyChatWindow
          projectId='f288ff02-c2a6-4d5e-bd4b-b6985e68808b'
          username={props.user.username}
          secret={props.user.secret}
        />
      </div>
    </div>
  );
};

export default ChatsPage;