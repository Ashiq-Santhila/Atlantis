import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Box, Button, Flex, Heading, Icon, Img, SimpleGrid, Text,Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,useColorModeValue,Grid,  IconButton,
  InputGroup,
  InputLeftElement,Input } from '@chakra-ui/react'
import NFTBanner from 'assets/img/auth/topbg.jpg';
import Card from 'components/card/Card';
import Rocket from 'assets/img/games/rocket1-removebg-preview.png';
import { MdArrowCircleRight, MdClose, MdCloseFullscreen } from 'react-icons/md';
import { getBackgrounds, getAssignedGame } from 'utils/gameApplication/gamePlayService';
import { SearchIcon } from '@chakra-ui/icons';
import { VSeparator } from 'components/separator/Separator';

import { API_SERVER } from 'config/constant';
import { motion } from 'framer-motion';
// Games Image
import InitialImg from 'assets/img/games/1700.jpg';
import FirstScreen from './screens/FirstScreen';

import { playgame,lastGame } from "utils/gameApplication/playgames";
import CharacterScreen from './screens/CharacterScreen';
import { Navigate,useNavigate } from 'react-router-dom';

type State = { 
  level: string;
  payload?: any;  
  gameTitle?: any; 
};

type Action = {
  type?: string;
  payload?: any;  
  gameTitle?: any;  
  [x: string]: any
};

const reducer = (state: State, action: Action) => {
  const {type, payload, gameTitle} = action;
 
  switch (type) {
    case 'level_0': {
      return {...state, level: '0', payload};
    }
    case 'level_1': {
      return { ...state, level: '1', payload};
    }
    case 'level_2': {
      return {...state, level: '2', payload};
    }
    case 'level_3': {
      return {...state, level: '3', payload};
    }

    default:
      return state;
  } 
};


// export const DataContext = createContext<any>(null);  

const GamePlay: React.FC = () => {

  const { data, token } = JSON.parse(localStorage.getItem('user'));
  const { id } = data;
  const navigate = useNavigate();
  const [assignedData, setFormData] = useState([]),
  [img, setImg] = useState<any[]>([]),
  [enter, setEnter] = useState(false),
  [fil, setFil] = useState<string>(''),
  [bgIndex, setBgIndex] = useState<number>(),
  [datas, setDatas] = useState<any>();
   // vignesh 08-01-24
  const [formData,setData] = useState({
  galGameId:null,
  galLearnerId:null,
  galGameState:'level_0',
  galBlockId:null,
  galQuestionState:null,
  galTimeSpent:null,
  galAverageScore:null,
  galStartDateTime:null,
  galEndDateTime:null,
  });

  // [play, setPlay] = useState<boolean>(false);  

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  let [ tabState, setTabState ] = useState('Creation');
  const searchIconColor = useColorModeValue('gray.700', 'white');

  const initialState: State = {   
    level: '0',    
  };

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
    
  const fetchData = async () => {
    
    const result = await getBackgrounds();
    if (result?.status !== 'Success')
      return alert('getbackruond error:' + result?.message);
    setImg(result?.data);
  };


  const fetchAssignedGame = async () => {
    try {
      const result = await getAssignedGame(id);
      // Assuming data is nested under 'data' property

      setFormData(result?.data);
      console.log('assignedData',result.data)
    } catch (error) {
      console.error('Error fetching assigned games:', error);
    }
  };

 
  useEffect(() => {
    // fetchData();
    // vignesh 08-01-24
    
    setData((prevData) => ({
      ...prevData,
      galLearnerId: id,
    }));
    //
    fetchAssignedGame();
  }, []);


  // vignesh 08-01-24
  const handlePlayGames = async (formdata:any) => {
     
   
    const datast = JSON.stringify(formdata)
   
    const result = await playgame(datast); 

    return result;

  }  

const handlePlay =(gid:any)=>{
  if(gid){
    navigate(`/game/play/${gid}`);
  }
  // const element = document.getElementById('container');       
  //   if (element) {
  //     if (document.fullscreenElement) {
  //       document.exitFullscreen().catch((err) => {
  //           console.log(`Error attempting to exit fullscreen: ${err.message}`);
  //         });      
  //     }
  //   }
  
}
  const handleClose = () => {
    const element = document.getElementById('container');       
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
            console.log(`Error attempting to exit fullscreen: ${err.message}`);
          });      
      }
    }
    dispatch({ type: 'level_0' })
    // setPlay(false)  
  }  
  
  useEffect(()=> {
    localStorage.setItem('datas',datas);
  },[datas])

  useEffect(()=> {
    const getData = localStorage.getItem('datas');
    dispatch({type: getData})    
  },[])
 

  // console's  
 
  

  return (
    <>
      <Box className="LearnerGames" position={'relative'}>
        <Box mb={{ base: '50px', xl: '30px' }} className="box">
          <Card backgroundImage={NFTBanner} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} height={'300px'} width={'100%'} overflow={{sm: 'auto', xl: 'unset'}} mt="87px">
            <Box display={{base: 'block', xl:'flex'}} justifyContent="space-between" alignItems={'end'} padding={'20px'}>
              <Box display={'flex'} flexDirection={'column'}  width={'700px'}>
                <Heading color={'#fff'} pb={'20px'} display={'flex'} alignItems={'center'} >Learning Adventures Hub <Img src={Rocket} height={'50px'} width={'50px'} ml={'20px'} transform={'rotate(40deg)'} /></Heading>
                <Text fontSize={'15px'} color={'#fff'} letterSpacing={'1px'}>Explore a world of interactive LMS-oriented games designed to enhance your learning experience and make education engaging and enjoyable.</Text>
              </Box>
              {/* <Button
                mt="10px"
                mb="15px"
                mr="10px"
                padding={2}
                background="#ffffff82"
                color="#fff"
                w={150}
                onClick={handleCourse}
              >
                Create Game
              </Button> */}
              {/* <Button mt='10px' mb='15px' padding={2} background='#3311db' color='#fff' w={70} onClick={handleNavigate}>New</Button> */}
            </Box>      
          </Card>
          <Card mt="25px">
            <Flex
              gridArea="1 / 1 / 2 / 2"
              display={{ base: 'block', lg: 'flex' }}
            >             
              <VSeparator mx="30px" h="100%" />
              <InputGroup w={{ base: '100%', md: '300px' }} ml="auto">
                <InputLeftElement
                  children={
                    <IconButton
                      aria-label="search"
                      bg="inherit"
                      borderRadius="inherit"
                      _active={{
                        bg: 'inherit',
                        transform: 'none',
                        borderColor: 'transparent',
                      }}
                      _hover={{
                        background: 'none',
                      }}
                      _focus={{
                        background: 'none',
                        boxShadow: 'none',
                      }}
                      icon={
                        <SearchIcon color={searchIconColor} w="15px" h="15px" />
                      }
                    />
                  }
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={fil || ''}
                  onChange={(e) => setFil(e.target.value)}
                  bg={'#f9f9f9'}
                  borderRadius={'14px'}
                  w={{ base: '200px', xl: '300px' }}
                />
              </InputGroup>
            </Flex>
          </Card>
        </Box>

        <Card mt="10px">          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {assignedData &&
               assignedData.map((game, i) => (
                // <div key={i}>
                <Card
                  key={i}
                  borderRadius={'15px'}
                  justifyContent={'center'}
                  // backgroundSize={'cover'}
                  // backgroundPosition={'center'}
                  // blur={'30px'}
                  // boxShadow={'2px 4px 38px #25252614'}
                  // boxShadow={'1px 2px 23px #5353601a'}
                  boxShadow={'1px 4px 29px #44445429'}
                  // backgroundImage={img && img[i]?.aniImages}
                  transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
                  position={'relative'}
                  width={'100%'}
                  // height={'240px'}
                  padding={'10px'}
                  className="list-card"
                >
                  <Box
                    position={'relative'}
                    overflow={'hidden'}
                    borderRadius={'10px'}
                  >
                    <Img
                      className="list-img"
                      // src={img && img[i]?.gasAssetImage}
                      // src={'http://192.168.1.46:5555/uploads/background/9ls0_4iri_201221.jpg'}
                      // src={`http://192.168.1.46:5555/${game.gasAssetImage}`} 
                      src={`${game?.image?.gasAssetImage}`} 
                      height={'180px'}
                      width={'100%'}
                      borderRadius={'15px'}
                      position={'relative'}
                    />
                    {/* <Box _before={{ content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '15px', backgroundImage: 'linear-gradient(95deg, #a927f812, #2857bc)' }}></Box> */}
                  </Box>

                  <Flex justifyContent={'space-between'} margin={'10px 0'}>
                    <Box>
                    <Text
                        color={'#2b2b2ede'}
                        fontSize={'16px'}
                        fontWeight={'800'}
                      >
                        {game.gameTitle}
                      </Text>
                      <Text
                        color={'#745c5cc9'}
                        mt={'5px'}
                        fontSize={'14px'}
                        fontWeight={'700'}
                        height={'30px'}
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                      >
                         {game.ctName}
                      </Text>
                     
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                      <Button
                        bg={'linear-gradient(to left, #7551ff, #3311db)'}
                        _hover={{
                          bg: 'linear-gradient(to left, #7551ff, #3311db)',
                        }}
                        borderRadius={'150px'}
                        height={'40px'}
                        width={'40px'}
                        boxShadow={'2px 4px 13px #4845456b'}
                        // onClick={handlePlay}
                        onClick={() => handlePlay(game.gameId)}
                      >
                        <Icon
                          as={MdArrowCircleRight}
                          color={'#fff'}
                          fontSize={'22px'}
                        />
                      </Button>
                    </Box>
                  </Flex>
                </Card>
              ))}
          </SimpleGrid>
        </Card>                     
      </Box>
    </>
  );
};

export default GamePlay;
