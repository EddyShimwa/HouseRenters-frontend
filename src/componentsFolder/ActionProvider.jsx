import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
      const handleamakuru = () => {
        const botMessage = createChatBotMessage('amakuru ni meza . ayawe?.');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
      const handleElse = () => {
        const botMessage = createChatBotMessage('i am still under training i can not understand some words ');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
      const handleDog = () => {
        const botMessage = createChatBotMessage(
          "Here's a  picture of house we have!",
          {
            widget: 'dogPicture',
          }
        );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleamakuru,
            handleElse,
            handleDog
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;