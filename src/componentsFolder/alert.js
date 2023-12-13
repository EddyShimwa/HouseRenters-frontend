import { useToast } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Wrap } from '@chakra-ui/react'
import { WrapItem } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { OpenModalContext } from './context'

function ToastStatusExample() {
    const{Message}=useContext(OpenModalContext)
    const{messageType}=useContext(OpenModalContext)
    const toast = useToast()
     return (
       <ChakraProvider>
      <Wrap>
       <WrapItem> 
    {
         useEffect(()=>{
            messageType==="success" ? toast({
                title:Message,
                status:"success",
                position:'top',
                isClosable: true,
              }):toast({
                title:Message,
                status:"error",
                position:'top',
                isClosable: true,
              })
         },[Message])
      
    }
    </WrapItem>
      </Wrap>
      </ChakraProvider>
    )
  }
  export default ToastStatusExample