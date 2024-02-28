import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Icon, Img, Input, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { motion } from 'framer-motion';



// Images
import Dialog from 'assets/img/games/dialog.png';
import NextBtn from 'assets/img/screens/next.png';
import LeftBtn from 'assets/img/games/left.png';
import RightBtn from 'assets/img/games/right.png';



import { API_SERVER } from 'config/constant';
import { DataContext } from './gamePlayArea';

interface DialogProps {   
  inputId?:any,
  handleNextBlock?:any,
}

const DialogBox: React.FC<DialogProps> = ({inputId,handleNextBlock}) => {
  const useData = useContext(DataContext)
  const [arrayText, setArrayText] = useState<any>([])
  console.log('usePassData',useData)
  const boxStyle: any = {
    width: '100%',
    height: '150px',
    backgroundColor: 'skyblue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: '20px',
    position: 'absolute',
    bottom: '0',
  };
  
  const inputKey = `Dialog${inputId}`;
  const DialogDetails=useData?.State?.showGamePlay?.input[inputKey]


  
  // const callTwoFunction = () => {
  //   handleNextBlock(inputId, 'Note', DialogDetails.Dialognavigate);    
  // }

  // useEffect(()=> {
  //   let broke = DialogDetails.dialog.split('')
  //   // setArrayText(broke)
  //   console.log('DialogDetails.dialog',broke.length)
  //   setTimeout(()=> {
  //     setArrayText(broke.slice(0, broke.length).join(''))
  //   },3000)
  // },[])


  // Typing Letter's
  useEffect(() => {
    let broke = DialogDetails.dialog.split('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= broke.length) {
        setArrayText(broke.slice(0, currentIndex).join(''));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }, [DialogDetails.dialog]);

  console.log('DialogDetails.dialog',arrayText)
  

  return (    
      <>
        <Box className='img-section dialog'>
          <motion.div initial={{ translateY: 500 }} animate={{ translateY: 0 }} transition={{ duration: 0.5, type: 'tween'}} >      
            <Box className='DialogBox'>
              <Img className='dialog-pad' src={Dialog} loading="lazy" />
              <Box className='title-box'>
                <Text className='title'>
                {useData?.State?.showBgVoices?.NPC === "99999" ? 'Narrator' 
                    : useData?.State?.showBgVoices?.NPC === "999999" ? useData?.State?.leanerProfile?.lenNickName
                    : useData?.State?.showBgVoices?.NPCname}
                  </Text>
                {/*Afrith-modified-ends-26/Feb/24*/}
              </Box>
              <Box className='content-box'>                        
                  <Text className='text'> {arrayText} </Text>               
              </Box>
              <Box className='btns-box'>
                <Button className='btns left-btn'><Img src={LeftBtn} /></Button>                           
                <Button className='btns right-btn' onClick={()=> handleNextBlock(inputId,'Dialog', DialogDetails.Dialognavigate)}><Img src={RightBtn} /></Button>                           
              </Box>                
            </Box>
          </motion.div>
        </Box>
      </>
  );
}
 
export default DialogBox
