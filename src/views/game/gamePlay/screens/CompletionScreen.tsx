import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Icon, Img, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';

// Images
import CompletionPad from 'assets/img/screens/Chapter Complete Background.png';
import RewardArrow from 'assets/img/screens/Reward Bar.png';
import SkillsBox from 'assets/img/screens/back.png';
import PointsBox from 'assets/img/screens/points.png';
import PointsBox2 from 'assets/img/screens/points2.png';
import NextBtn from 'assets/img/screens/next.png';
import Background from 'assets/img/games/fristscreenBackground.jpg';
import Badge from 'assets/img/games/badge.png';
import LeftArrow from 'assets/img/games/left-arrow.png';
import RightArrow from 'assets/img/games/right-arrow.png';
import Crown from 'assets/img/games/crown-pad.png';
import SkillIcon from 'assets/img/games/skill-icon.png';


// CONTEXT
import { DataContext } from '../components/gamePlayArea';
import { IoMdClock } from 'react-icons/io';


interface CompletionScreenProps {   
}

const CompletionScreen: React.FC<CompletionScreenProps> = () => {
    const useData = useContext(DataContext);

    // ANIMATIONS
    const AniCompletionScreenZoom = { hidden: {scale: 0 }, visible: {scale: 1, transition: { duration: 0.5, delay: 1, type: 'spring', mass: 1 } } };    
    const AniRewarsArrowUp = { hidden: { opacity: 0, translateY: 40  }, visible: {opacity: 1, translateY: 0, transition: {duration: 2, delay: 4} } }
    const AniPointsBoxZoomIn = { hidden: { opacity: 0, scale: 0 }, visible: {opacity: 1, scale: 1, transition: {duration: 6, delay: 7, type: 'spring', mass: 1} } };    
    const AniBadgeBoxZoomIn = { hidden: { opacity: 0, scale: 0 }, visible: {opacity: 1, scale: 1, transition: {duration: 6, delay: 9, type: 'spring', mass: 1} } };        
    const AniUpgradeUp = { hidden: { opacity: 0, translateY: 40  }, visible: {opacity: 1, translateY: 0, transition: {duration: 2, delay: 11} } }
    const AniNextBtnZoomIn = { hidden: { opacity: 0, scale: 0 }, visible: {opacity: 1, scale: 1, transition: {duration: 5, delay: 13, type: 'spring', mass: 1} } };        

    console.log('usePassData',useData)   
    
 
  return (
    <>
         <Box className='Play-game CompletionScreen'>          
            <Box position={'fixed'} top={0} left={0} right={0} bottom={0} zIndex={999}>                          
              <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
                <Box className='img-box' position={'relative'}>                    
                  <Img className='img-bg' src={useData?.State?.showBgImage} />                   
                  <motion.div className='img-section' variants={AniCompletionScreenZoom} initial={'hidden'} animate={'visible'}>
                    <Img className='completion-pad' src={CompletionPad} loading="lazy"  />
                    <Text className='heading'>{useData?.State?.showCompletionScreen?.gameScreenTitle}</Text>    
                    <Box className='content-box'>
                        <Text className='title'>{useData?.State?.showCompletionScreen?.gameCompletedCongratsMessage}</Text>                                               
                        <motion.img className='arrow-img' src={RewardArrow} variants={AniRewarsArrowUp} initial={'hidden'} animate={'visible'} />
                        <Box className='rewards-box'>
                            <motion.div className='boxes pointsBox' variants={AniPointsBoxZoomIn} initial={'hidden'} animate={'visible'} >
                                <Img className='skillsBox-img' src={SkillsBox} />
                                <Text className='label'>Points</Text>
                                <Box className='insideBox'>
                                  <Box className='box-1 box'>
                                    <Img className='points' src={PointsBox} />
                                    <Text className='text'>20/100</Text>
                                  </Box>
                                  <Box className='box-2 box'>
                                    <Img className='points' src={PointsBox2} />
                                    <Text className='text'>250/1000</Text>
                                  </Box>
                                </Box>
                            </motion.div>
                            <motion.div className='boxes badgeBox' variants={AniBadgeBoxZoomIn} initial={'hidden'} animate={'visible'} >
                                <Img className='badgeBox-img' src={SkillsBox} />
                                <Text className='label'>Sheild</Text>
                                <Box className='insideBox'>
                                  <Img className='badge' src={Badge} />
                                </Box>
                            </motion.div>
                        </Box>
                        <motion.div className='skill-uprade' variants={AniUpgradeUp} initial={'hidden'} animate={'visible'}>
                          <Box > 
                            <Box className='arrows-box'>
                              <Img className='arrow-left' src={LeftArrow} />
                              <Img className='arrow-right' src={RightArrow} />
                            </Box>                         
                              <Text className='text'>{'Skill Upgrade'}</Text>                          
                          </Box>
                          <Box className='crown-pad-box'>
                            <Img className='arrow-img' src={Crown} />
                            <Text className='text'> {'Communication Upgrade'} </Text>
                          </Box>
                          <Box className='skill-icon'>
                            <Img src={SkillIcon} />                          
                          </Box>
                        </motion.div>
                    </Box>
                  </motion.div>                                  
                  <motion.button className='next-btn' onClick={()=> useData?.Function?.handleNextTab()}  variants={AniNextBtnZoomIn} initial={'hidden'} animate={'visible'} ><Img src={NextBtn} /></motion.button>   
                </Box>
                <Button position={'absolute'} top={0} right={0} onClick={()=> useData?.Function?.handleClose()}><Icon as={MdClose} /></Button>       
              </motion.div>           
            </Box>         
        </Box>
   </>
  )
}

export default CompletionScreen
