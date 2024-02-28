import React, { Suspense, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Box, Button, Icon, Img, Input, position } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { motion, useAnimation } from 'framer-motion';
import { API_SERVER } from 'config/constant';
import { DataContext } from '../components/gamePlayArea';


// Games Image
import InitialImg from 'assets/img/games/load.jpg';
import Sample from '../../../../assets/img/games/Character_sample.glb';
// import Victor from '../../../../assets/img/games/victoria.glb';
// import Sample from '../../../../assets/img/games/Source_file.glb';
import Background from 'assets/img/games/fristscreenBackground.jpg';
import Select from 'assets/img/games/select_character.png';


// Three js
import { Canvas, useLoader, useFrame  } from 'react-three-fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useGLTF } from '@react-three/drei'
import { Environment, OrbitControls } from '@react-three/drei'
// import { FBXLoader } from 'three/addons/loaders/FBXLoader';


// Components
import PlayingCharacter from '../three/PlayingCharacterForSelect';
import Sphere from '../three/Sphere';
import Trex from '../three/Trex';
import { Parrot } from '../three/Parrot';



interface PlayGamesProps {
    state?: any,
    dispatch?: any,
    setDatas?: any,
}



const PlayGames: React.FC<PlayGamesProps> = ({state, dispatch, setDatas}) => {
  const useData = useContext(DataContext)     
  
  const handleClick = () => {
    console.log('Click"s');
  }
      
  return (
   <>        
      <Box className='Play-game CharacterScreen'>                              
        <Box onClick={()=> console.log('hello')} h={'100vh'} w={'100%'} >
        <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
          <Box className='img-box'>             
            <Img className='img-bg' src={useData?.State?.showBgImage} />
            <Box className='img-section'>
              <Img className='select-pad' src={Select} loading="lazy" />                   
               {/* Afrith-modified-starts-26/Feb/24 */}
               <Input className='enter-name' placeholder='Enter Character Name' value={useData?.State?.leanerProfile?.lenNickName} readOnly />       
                {/* Afrith-modified-ends-26/Feb/24 */}       
              <Box className='back-n-next-box'>
                <Button className='btns left-btn' onClick={handleClick}></Button>                
                <Button className='btns right-btn' onClick={() => useData?.Function?.handleNextTab()}></Button>
              </Box>
              {/* <Canvas camera={{ position: [0, 5, 10] }} >  */}
              <Canvas camera={{ position: [0, 1, 9] }} > {/* For Single view */} 
                {/* <Environment preset={"park"} background />   */}
                <directionalLight position={[2.0, 78.0, 100]} intensity={0.8} color={'ffffff'} castShadow />          
                <ambientLight intensity={0.5} />              
                {/* <OrbitControls   />  */}
                <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />   

          {/* COMPONENTS */}
                <PlayingCharacter />                                        
                {/* <Sphere position={[0,0,0]} size={[1,30,30]} color={'orange'}  />   */}
                {/* <Trex position={[0,0,0]} size={[1,30,30]} color={'red'}  />             */}
                <Parrot />
              </Canvas>              
              </Box> 
          </Box>
        </motion.div>
        </Box>            
            <Button position={'absolute'} top={0} right={0} onClick={useData?.Function?.handleClose}><Icon as={MdClose} /></Button>               
      </Box>       
   </>
  )
}





// New Sphere




export default PlayGames
