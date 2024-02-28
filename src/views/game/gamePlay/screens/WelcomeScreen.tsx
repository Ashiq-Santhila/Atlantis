import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Icon, Img, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';

// Images
import Welcome from 'assets/img/screens/welcome.png';
import RewardArrow from 'assets/img/screens/Reward Bar.png';
import SkillsBox from 'assets/img/screens/back.png';
import NextBtn from 'assets/img/screens/next.png';
import Background from 'assets/img/games/fristscreenBackground.jpg';

// CONTEXT
import { DataContext } from '../components/gamePlayArea';
import { IoMdClock } from 'react-icons/io';


interface WelcomeScreenProps {   
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
    const useData = useContext(DataContext);

    console.log('usePassData',useData)   
 
  return (
    <>
         <Box className='Play-game WelcomeScreen'>          
            <Box position={'fixed'} top={0} left={0} right={0} bottom={0} zIndex={999}>                          
              <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
                <Box className='img-box' position={'relative'}>  
                  {/* <Img className='img-bg' src={`${API_SERVER}/${useData?.Response?.[0]?.gasAssetImage}`} />      */}
                  <Img className='img-bg' src={useData?.State?.showBgImage} />     
                  <Box className='img-section'>
                    <Img className='welcome-pad' src={Welcome} loading="lazy" />
                    <Text className='title'>{useData?.State?.showStartScreen}</Text>
                    <Box className='content-box'>
                        <Box className='timer'>
                          <Icon as={IoMdClock} />
                          <Text>{useData?.State?.showWelcomeScreen?.gameDuration} Mins</Text>
                        </Box>
                        <Text className='story-line'>{useData?.State?.showWelcomeScreen?.gameStoryLine}</Text>
                        <Img className='arrow-img' src={RewardArrow} />
                        <Box className='rewards-box'>
                            <Box className='boxes skillBox'>
                                <Img className='skillsBox-img' src={SkillsBox} />
                                <Text className='label'>Skills</Text>
                                <Box className='insideBox'>
                                  <Text className='text'>{useData?.State?.showWelcomeScreen?.gameSkills}</Text>
                                </Box>
                            </Box>
                            <Box className='boxes learnerOutcomesBox'>
                                <Img className='learnerOutcomesBox-img' src={SkillsBox} />
                                <Text className='label'>Learner Outcomes</Text>
                                <Box className='insideBox'>
                                  <Text className='text'>{useData?.State?.showWelcomeScreen?.gameLearningOutcome}</Text>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='author-box'>
                          <Box className='text'>
                            <Text>* Author *</Text>
                            <Text>{useData?.State?.showWelcomeScreen?.gameAuthorName}</Text>
                          </Box>
                        </Box>
                        <Box className='additional-welcome-box'>
                          <Text className='text'> {useData?.State?.showWelcomeScreen?.gameAdditionalWelcomeNote} </Text>
                        </Box>
                    </Box>
                  </Box>                                  
                  <Button className='next-btn' onClick={()=> useData?.Function?.handleNextTab()}><Img src={NextBtn} /></Button>   
                </Box>
                <Button position={'absolute'} top={0} right={0} onClick={()=> useData?.Function?.handleClose()}><Icon as={MdClose} /></Button>       
              </motion.div>           
            </Box>         
        </Box>
   </>
  )
}

export default WelcomeScreen
