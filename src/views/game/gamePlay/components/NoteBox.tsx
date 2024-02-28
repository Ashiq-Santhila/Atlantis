import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Icon, Img, Input, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { motion } from 'framer-motion';


// Images
import Note from 'assets/img/games/note.png';
import NextBtn from 'assets/img/screens/next.png';



import { API_SERVER } from 'config/constant';
import { DataContext } from '../components/gamePlayArea';

interface NoteBoxProps {   
  inputId?:any,   
  handleNextBlock?:any,  
}

const NoteBox: React.FC<NoteBoxProps> = ({inputId,handleNextBlock}) => {

  const useData = useContext(DataContext)
  console.log('usePassData',useData)
  const [animation, setAnimation] = useState<any>(1)

  const boxStyle:any = {
    width: '40%',
    height: '500px',
    backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };


  const inputKey = `Note${inputId}`;
  const NoteDetails = useData?.State?.showGamePlay?.input[inputKey];
  console.log('Center', NoteDetails)
  

  // const callTwoFunction = () => {
  //   handleNextBlock(inputId, 'Note', NoteDetails.Notenavigate);
  //   setAnimation(0)
  // }

  return (
    <>
      <Box className='img-section'>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}  transition={{ duration: 0.5, delay: 0.5, type: 'spring', mass: 2 }} >      
          <Box className='NoteBox'>
            <Img className='note-pad' src={Note} loading="lazy" />
            <Text className='title'>{'Note'}</Text>
            <Box className='content-box'>                        
                <Text className='text'> {NoteDetails.note} </Text>               
                {/* <Text className='text'>You are in charge Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptate non dolorem, harum dicta est, odit nam tempore beatae iure vel. Rem iste quam fugit sed fugiat debitis nihil pariatur.</Text>                */}
            </Box>
            <Button className='next-btn' onClick={()=> handleNextBlock(inputId,'Note', NoteDetails.Notenavigate)}>
              <Img src={NextBtn} />
            </Button>           
          </Box>
        </motion.div>
      </Box>
    </>
  );
}
 
export default NoteBox
