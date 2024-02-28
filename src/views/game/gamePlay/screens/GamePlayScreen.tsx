import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Box, Button, Icon, Img, Input, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { motion } from 'framer-motion';


// Images
import NPCImage from 'assets/img/games/narrator.png';

import { DataContext } from '../components/gamePlayArea';

// Components
import PlayingCharacter from '../three/PlayingCharacter';
import NoteBox from '../components/NoteBox';
import DialogBox from '../components/DialogBox';
import Interaction from '../components/Interaction';
import { activityUpdate } from "utils/gameApplication/gameActivityService";

import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';


const GamePlayScreen: React.FC = () => {
  const useData = useContext(DataContext)
  const getQuestNo = useData?.State?.PlayQuestNo ;

  const BlockNo = useData?.State?.BlockNo;
  const setBlockNo = useData?.State?.setBlockNo;

  // const [BlockNo, setBlockNo] = useState<any>(),
    const [showResponseTab, setShowResponseTab] = useState<any>(false),
    [ScoreSent, setScoreSent] = useState<any>(),
    [selectBlockValue, setSelectBlockValue] = useState<any>(null);


  const filteredList: any = Object.values(useData?.State?.showGamePlay?.items).filter((item: any) => item?.id === `${BlockNo}` && item?.questNo === getQuestNo);  
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once after the initial render

  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleNextBlock = async (id?: any, type?: any, navigateId?: any, seqId?: any) => {
    const founditem: any = Object.values(useData?.State?.showGamePlay?.items).filter((item: any) => item?.input === id && item?.questNo === getQuestNo);
    const makeSeqId = `${founditem[0].questNo}.${selectBlockValue}`;
    console.log('navigateId', navigateId);
    // activityCreate
    const data = {
      blockname: type,
      galAverageScore: ScoreSent,
      galBlockId: id,
      galTimeSpent: formatTime(seconds),
      navigateId: navigateId
    }
    const actId = localStorage.getItem('activityId')
    console.log('dataActivity', data);
    const datas = JSON.stringify(data)
    console.log('data', datas)
    const result = await activityUpdate(datas, actId);
    if (result.status !== 'Success') {
      console.log('result',)
      return false;
    } else {
      if (navigateId) {
        if (navigateId === 'Repeat Question') {
          // setBlockNo(0)
          // setTimeout(() => {
            setBlockNo(founditem[0].upNext);
          // }, 200);


        }
        else if (navigateId === 'Replay Point') {
          const getlenth: any = Object.values(useData?.State?.showGamePlay?.items).filter((item: any) => item?.questNo === getQuestNo)
          setBlockNo(getlenth[0].id)
        }
        else if (navigateId === 'Complete') {
          useData?.State?.setCurrentTab(6)
        }
        else {
          const founditem: any = Object.values(useData?.State?.showGamePlay?.items).filter((item: any) => item?.input === parseInt(navigateId, 10) && item?.questNo === 1);
          setBlockNo(founditem[0].id)
          // setBlockNo(founditem[0].upNext);             
        }
      }
      else {
        const founditem: any = Object.values(useData?.State?.showGamePlay?.items).filter((item: any) => item?.input === id && item?.questNo === 1);
        setBlockNo(founditem[0].upNext)
        setShowResponseTab(false)
        // setBlockNo(founditem[0].upNext);  
      }
    }
  }


  useEffect(() => {
    const getlenth: any = Object.values(useData?.State?.showGamePlay?.items).filter((item: any) => item?.questNo === 1)
    setBlockNo(getlenth[0].id)    
  }, []);
  


  // This UseEffect is for if upNext id or seq id is empty, it will go Completion screen - Ashiq's work
  useEffect(() => {
    const getLengthOfGameItems: any = Object.values(useData?.State?.showGamePlay?.items).length;
    const getUpNextOfGameItems: string = useData?.State?.showGamePlay?.items[getLengthOfGameItems - 1].upNext;
    if (BlockNo === getUpNextOfGameItems) {
      if (filteredList[0] === undefined) {
        useData?.State?.setCurrentTab(6)
      };
    }
  }, [BlockNo])

  console.log('formatTime', formatTime(seconds))
  console.log('BlockNo', BlockNo)

  return (
    <>
      <Box className='Play-game NDIScreen'>
        <Box position={'fixed'} top={0} left={0} right={0} bottom={0} zIndex={999}>
          <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
            <Box className='img-box' position={'relative'}>
              <Img className='img-bg' src={useData?.State?.showBgImage} />
              {filteredList.map((item: any, index: any) => (
                <React.Fragment key={index}>
                  {item?.type === 'Note' ? (
                    <NoteBox inputId={item?.input} handleNextBlock={handleNextBlock} />

                  ) : item?.type === 'Dialog' ? (
                    <DialogBox inputId={item?.input} handleNextBlock={handleNextBlock} />
                  ) : item?.type === 'Interaction' && (
                    <Interaction inputId={item?.input} id={item?.id} handleNextBlock={handleNextBlock}
                      showResponseTab={showResponseTab} setShowResponseTab={setShowResponseTab}
                      selectBlockValue={selectBlockValue} setSelectBlockValue={setSelectBlockValue}
                      setScoreSent={setScoreSent}
                    />
                  )}
                </React.Fragment>
              ))}                      
            </Box>
            <Box className='glb' position={'absolute'} top={0} height={'100vh'} w={'100%'} zIndex={'-9'}>
              <Box className='npc-box'>
                <Img src={useData?.State?.showBgVoices?.NPCImage} className='npc-img' />
              </Box>
              <Canvas camera={{ position: [11, 1, 7] }} > {/* For Single view */} 
                {/* <Environment preset={"park"} background />   */}
                <directionalLight position={[10.0, 78.0, 100]} intensity={0.8} color={'ffffff'} castShadow />          
                <ambientLight intensity={0.5} />              
                {/* <OrbitControls   />  */}
                <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />   

                {/* COMPONENTS */}
                <PlayingCharacter />                                                                        
              </Canvas>    
            </Box>     
            <Button position={'absolute'} top={0} right={0} onClick={() => useData?.Function?.handleClose()}><Icon as={MdClose} /></Button>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}

export default GamePlayScreen
