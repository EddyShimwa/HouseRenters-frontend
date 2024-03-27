// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture';
const botName = 'Scott'

;

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName} a scholarsnid AI! How can I Help?`)],
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