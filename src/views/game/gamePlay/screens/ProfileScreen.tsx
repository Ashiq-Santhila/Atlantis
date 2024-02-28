import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, FormLabel, Icon, Img, Input, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';
// Games Image
import ProfileCard from 'assets/img/games/profile-card.png';
import FormField from 'assets/img/games/formfield.png';
import NextBtn from 'assets/img/screens/next.png';

import { DataContext } from '../components/gamePlayArea';

interface ProfileScreenProps {     
}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {    
  const useData = useContext(DataContext)
        
      useEffect(() =>{
        const fetchData = async () => {
          try {           
            const res = await useData?.Function?.handlePlayGames();
            console.log('handlePlayGames success:', res);
      
            console.log('hello');
          } catch (error) {
            console.error('Error in handlePlayGames:', error);
          }
        };
      
        fetchData(); // Call the async function
      },[]);      


      console.log('statePayload', useData?.state);
  return (
   <>
         <Box className='Play-game ProfileScreen'>
          {/* {state.gameStarted ? */}
            <Box position={'fixed'} top={0} left={0} right={0} bottom={0} zIndex={999}>            
              {/* <motion.div initial={{ opacity: 0, transform: 'scale(0.5)' }} animate={{ opacity: 1, transform: 'scale(1)' }} transition={{ duration: 0.3, delay: 0.5 }} > */}
              <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
                <Box className='img-box' position={'relative'}>  
                  <Img className='img-bg' src={`${API_SERVER}/${useData?.Response?.[0]?.gasAssetImage}`} />   
                  <Box className='img-section'>
                    <Img className='img' src={ProfileCard} />                    
                    <Box className='profile-box'>
                      <Box className='nick-name' mb={'20px'}>
                        <FormLabel>Nick Name</FormLabel>
                        <Img className='formfield' src={FormField} /> 
                        <Input type={'text'} />
                      </Box>
                      <Box className='gender'>
                        <FormLabel>Gender</FormLabel>
                        <Img className='formfield' src={FormField} /> 
                        <Input type={'text'} />
                      </Box>
                    </Box>
                  </Box>
                  {/* <Box className='pinewood' onClick={()=>dispatch({ type: 'level_3'})}></Box> */}
                  <Button className='next-btn' onClick={()=>useData?.Function?.handleNextTab()}><Img src={NextBtn} /></Button>                  
                </Box>
                <Button position={'absolute'} top={0} right={0} onClick={useData?.Function?.handleClose()}><Icon as={MdClose} /></Button>       
              </motion.div>           
            </Box>
             {/* : null 
          } */}
        </Box>
   </>
  )
}

export default ProfileScreen
