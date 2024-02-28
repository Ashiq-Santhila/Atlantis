import { Box, Button, Icon, Img, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

// Images
import Background from 'assets/img/games/fristscreenBackground.jpg';
import QueueBackground from 'assets/img/games/Quest_background.png';
import QueueScreen from 'assets/img/games/Queue_screen.png';
import Demo from 'assets/img/games/1700.jpg';
import Lock from 'assets/img/games/lock.png';

// CONTEXT
import { DataContext } from '../components/gamePlayArea';
import { BiMoney } from 'react-icons/bi';
import { GiCoins } from 'react-icons/gi';


const NoOfQueue = () => {
  const useData = useContext(DataContext);
  console.log('gamePlayList', useData.State.gamePlayList)
  return (
    <>
      <Box className='Play-game NoOfQueue'>
        <Box position={'fixed'} top={0} left={0} right={0} bottom={0} zIndex={999}>
          <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
            <Box className='img-box' position={'relative'}>
              {/* <Img className='img-bg' src={`${API_SERVER}/${useData?.Response?.[0]?.gasAssetImage}`} />      */}
              <Img className='img-bg' src={useData?.State?.showBgImage} />
              <Box className='img-section'>
                <Img className='queue-pad' src={QueueBackground} loading="lazy" />
                <Text className='title'>{'Level 1'}</Text>
                <Box className='content-box'>
                  {useData.State.showQuestList.map((item: any, index: any) => {
                    const questOneData = useData.State.gamePlayList.find((item: any) => item.galQuestNo === useData.State.showQuestList[index]);
                    const getTotalScore = useData.State.questTotalScore.find((item: any) => item.gameQuestNo === useData.State.showQuestList[index]);
                    console.log('questOneData', useData.State.gamePlayList)
                    //
                    return (
                      <Box
                        className='queue-box'
                        onClick={() => {
                          if (
                            useData?.State?.showQuestList[index] === 1
                          ) {
                            useData?.Function?.handlePlayQuest(useData.State.showQuestList[index]);
                          }
                        }}
                      >
                        <Img className='queue-screen' src={QueueScreen} />
                        <Text className='heading'>{getTotalScore.gameTitle ?? 'Quest'}-{useData.State.showQuestList[index]}</Text>
                        <Box className='badge'>
                          {/*Enable this below img when quest is lock*/}

                          {questOneData?.galQuestionState !== 'complete' && useData?.State?.showQuestList[index] !== 1 && (

                            <Img src={Lock} className='lock' />

                          )}



                          <Img src={Demo} /></Box>
                        <Text className='text'></Text>
                        <Box className='bottom-box'>
                          <Text className='amount-score'>{questOneData ? questOneData.galAverageScore ?? 0 : 0}/{getTotalScore.gameTotalScore ?? 100} <Icon as={BiMoney} /></Text>
                          <Text className='coin'>{questOneData ? questOneData.galAverageScore ?? 0 : 0}/{getTotalScore.gameTotalScore ?? 100} <Icon as={GiCoins} /></Text>
                        </Box>
                      </Box>

                    )


                  })}




                </Box>
              </Box>
            </Box>
            <Button position={'absolute'} top={0} right={0} onClick={() => useData?.Function?.handleClose()}><Icon as={MdClose} /></Button>
          </motion.div>
        </Box>
      </Box>
    </>
  )
}

export default NoOfQueue
