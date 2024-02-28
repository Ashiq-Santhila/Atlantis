import React, { useContext,useEffect,useState } from 'react'
import { Box, Img, Input, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { DataContext } from '../components/gamePlayArea';

// Images
import Overview from 'assets/img/games/game-overview.png';
import NextBtn from 'assets/img/games/next.png';

const GameOverview = () => {
    const useData = useContext(DataContext) ;        

  return (
    <>
         <Box className='Play-game Gameoverview-box'>
            <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.3, delay: 0.5 }} >
                <Box className='img-box'>
                    <Img className='img-bg' src={useData?.State?.showBgImage} /> 
                    <Box className='img-section'>
                        <Img src={Overview} className='overview-pad' />                        
                        <Box className='content-box'>                           
                            <Text className='text'>{useData?.State?.showBgVoices?.storyline}</Text>
                        </Box>                             
                        <Img src={NextBtn} className='close-btn' onClick={()=> useData?.Function?.handleCloseInfoScrn()} />              
                    </Box>
                </Box>
            </motion.div>
        </Box>    
    </>
  )
}

export default GameOverview
