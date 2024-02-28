import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Icon, Img } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';

import { DataContext } from '../components/gamePlayArea';


interface CharacterScreenProps {   
}

const CharacterScreen: React.FC<CharacterScreenProps> = () => {
    const useData = useContext(DataContext);

    console.log('usePassData',useData)

  return (
    <>
         <Box className='Play-game CharacterScreen'>          
            <Box position={'fixed'} top={0} left={0} right={0} bottom={0} zIndex={999}>                          
              <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
                <Box className='img-box' position={'relative'}>  
                  <Img className='img-bg' src={`${API_SERVER}/${useData?.Response?.[0]?.gasAssetImage}`} />                     
                  <Box onClick={()=>useData?.Function?.dispatch({ type: 'level_3'})}></Box>
                </Box>
                <Button position={'absolute'} top={0} right={0} onClick={useData?.Function?.handleClose}><Icon as={MdClose} /></Button>       
              </motion.div>           
            </Box>         
        </Box>
   </>
  )
}

export default CharacterScreen
