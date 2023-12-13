import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
        actions.handleHello();
      }
      else if (message.includes('amakuru')) {
        actions.handleamakuru();
      }
    else  if (message.includes('house')) {
        actions.handleDog();
      }
     
      else{
        actions.handleElse()
      }
  };
 

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;