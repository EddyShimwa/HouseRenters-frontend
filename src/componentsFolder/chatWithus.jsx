/* eslint-disable */
import * as React from 'react';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css';
import config from './config';
 import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { OpenModalContext } from './context';
 import closeIcon from './Images/close.png'
const style = {
  position: 'absolute',
  top: '56%',
  left: '85%',
  transform: 'translate(-50%, -50%)',
  width: 350,
 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChatWithUs() {
 const{openChat}=useContext(OpenModalContext)
 const{setOpenChat}=useContext(OpenModalContext)
 const handleclose=()=>{
    setOpenChat(false)
 }
  return (
    <div>
      <Modal
        open={openChat}
        onClose={handleclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className=" w-2/3     rounded-2xl">
        <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className=' flex justify-end '> <button onClick={handleclose}> <img  src={closeIcon} alt="" /></button></div>
               <span className=' flex justify-center font-txtFontFamily text-loginFontsize font-txtbodyFontWeight leading-loginLineHeight tracking-txtbodyLetterspacing text-txtecolor underline underline-offset-8'>Welcome to LiveChat</span>
          </Typography>
         
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
            <Chatbot    config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider} />
            </div>
           

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
