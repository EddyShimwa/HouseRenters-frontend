// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture';
const botName = 'WhereToStay '

;

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName} Can I help you with anything?`)],
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
   
  },
};

export default config;