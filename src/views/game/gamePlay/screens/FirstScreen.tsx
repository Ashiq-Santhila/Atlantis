import React, { useContext, useEffect } from 'react'
import { Box, Button, Icon, Img, Input, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { motion } from 'framer-motion';
// Games Image
import Login from 'assets/img/games/log_non.png';
import Background from 'assets/img/games/fristscreenBackground.jpg';


import { API_SERVER } from 'config/constant';
import { DataContext } from '../components/gamePlayArea';




const FirstScreen: React.FC = () => {
  const useData = useContext(DataContext)  

  console.log('statePayload', useData);

  return (
   <>
         <Box className='Play-game First-Screen'>          
            <Box position={'fixed'} top={0} left={0} right={0} bottom={0} zIndex={999}>            
              <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.3, delay: 0.5 }} >
                <Box className='img-box' position={'relative'}>                  
                  {/* <Img className='img-bg' src={`${API_SERVER}/${useData?.Response?.[0]?.gasAssetImage}`} />  */}
                  <Img className='img-bg' src={useData?.State?.showBgImage} /> 
                  <Img className='img' src={Login} loading="lazy" />   
                  <Text className='heading'>Atlantis</Text>
                  <Text className='welcome-text'>Welcome To</Text>
                  <Text className='welcome-text-name' textTransform={'capitalize'}>{useData?.State?.showStartScreen}</Text>                  
                  <Button className='btn' onClick={() => useData?.Function?.handleNextTab()}></Button>
                </Box>                 
                <Button position={'absolute'} top={0} right={0} onClick={()=> useData?.Function?.handleClose()}><Icon as={MdClose} /></Button>       
              </motion.div>           
            </Box>           
        </Box>
   </>
  )
}

export default FirstScreen
