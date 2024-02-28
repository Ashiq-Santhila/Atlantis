import React, { useContext, useEffect } from 'react'
import { Box, Button, Icon, Img, Input, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { motion } from 'framer-motion';
// Games Image
// import Login from 'assets/img/games/Welcome.png';
import Login from 'assets/img/games/log_non.png';
import { API_SERVER } from 'config/constant';
import { DataContext } from '../components/gamePlayArea';
import {getVoices}from 'utils/gameApplication/gamePlayService';
interface NoteBoxProps {   
  inputId?:any,   
  handleNextBlock?:any,  
  voices?:any,
}

const VoicePlay: React.FC<NoteBoxProps> = ({inputId,handleNextBlock,voices}) => {

  const useData = useContext(DataContext)
  let currentAudio: any = null;
  const playAudio1 = async (audioUrl: string): Promise<void> => {

    let id='2EiwWnXFnvU5JabPnv8n';
   const data = {
      "text": "Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts",
      "model_id": "eleven_monolingual_v1",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
      }
    }
    const result = await getVoices(id, JSON.stringify(data));


  


console.log('resultvoice',result)


    
    return new Promise<void>((resolve) => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.removeEventListener('ended', resolve);
      }

      const audio = new Audio(result);

      audio.addEventListener('ended', () => {
        resolve();
      });

      audio.play();
      currentAudio = audio;
    });
  };
  const playAudio = async (id:any) => {
    try {
      let id='2EiwWnXFnvU5JabPnv8n';
   const data = {
      "text": "Born and raised in the charming south",
      "model_id": "eleven_monolingual_v1",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
      }
    }
      const result = await getVoices(id, JSON.stringify(data));
  
      const audioBlob = new Blob([result], { type: 'audio/mpeg' }); // Adjust type if needed
      const audioURL = URL.createObjectURL(audioBlob);
  
      const audio = new Audio(audioURL);
      audio.play();
    } catch (error) {
      console.error('Error fetching or playing audio:', error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  

  return (
    <>
      <Box>
      <Button variant="contained" color="red" onClick={() => playAudio('dsd')}>
          Next
        </Button>
      </Box>
    </>
  );
}

export default VoicePlay
 