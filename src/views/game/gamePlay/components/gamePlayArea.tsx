import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import {
  Box, Button, Flex, Heading, Icon, Img, SimpleGrid, Text, Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel, useColorModeValue, Grid, IconButton,
  InputGroup,
  InputLeftElement, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip
} from '@chakra-ui/react'
import NFTBanner from 'assets/img/auth/topbg.jpg';
import Card from 'components/card/Card';
import Rocket from 'assets/img/games/rocket1-removebg-preview.png';
import { MdArrowCircleRight, MdCall, MdClose, MdCloseFullscreen } from 'react-icons/md';
import { getBackgrounds, getAssignedGame, getGamePlay, profileUpdate,  } from 'utils/gameApplication/gamePlayService';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { API_SERVER } from 'config/constant';
import { motion } from 'framer-motion';
// Games Image
import InitialImg from 'assets/img/games/1700.jpg';
import ProfileScreen from '../screens/ProfileScreen';
import FirstScreen from '../screens/FirstScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PlayerDetails from '../screens/PlayerDetails';
import CharterSelection from '../screens/CharterSelection';
import CompletionScreen from '../screens/CompletionScreen';
import GamePlayScreen from '../screens/GamePlayScreen';
import TopMenu from 'assets/img/games/top-menu-parts/top-menu.png';
import TopMenuNDI from 'assets/img/games/top-menu-parts/top-menu-NDI.png';
import HomePage from 'assets/img/games/top-menu-parts/home.png';
import Replay from 'assets/img/games/top-menu-parts/map.png';
import Setting from 'assets/img/games/top-menu-parts/settings.png';
import Overview from 'assets/img/games/top-menu-parts/game-overview.png';
import Profile from 'assets/img/games/top-menu-parts/profile.png';
import SettingPad from 'assets/img/games/top-menu-parts/setting-pad.png';
import SliderPointer from 'assets/img/games/top-menu-parts/slider-pointer.png';
import TooltipImg from 'assets/img/games/tooltip-1.png';
import VolumeTrack from 'assets/img/games/top-menu-parts/volume-track.png';


// LearderBoard Images
import ListPad from 'assets/img/games/leaderboard-parts/list-pad.png';
import Back from 'assets/img/games/back.png';
import Okay from 'assets/img/games/okay.png';



import { playgame, lastGame } from "utils/gameApplication/playgames";
import { activityCreate } from "utils/gameApplication/gameActivityService";
import { getCountries } from 'utils/company/companyService';


import NoOfQueue from '../screens/NoOfQueue';
import Leaderboard from '../informationScreens/Leaderboard';
import GameOverview from '../informationScreens/GameOverview';




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
  const { type, payload, gameTitle } = action;

  switch (type) {
    case 'level_0': {
      return { ...state, level: '0', payload };
    }
    case 'level_1': {
      return { ...state, level: '1', payload };
    }
    case 'level_2': {
      return { ...state, level: '2', payload };
    }
    case 'level_3': {
      return { ...state, level: '3', payload };
    }

    default:
      return state;
  }
};


export const DataContext = createContext<any>(null);


const GamePlayArea: React.FC = () => {

  const { data, token } = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const navigate = useNavigate();

  //***************************************** */
  const [showQuestList, setQuestList] = useState<any>();
  const [showStartScreen, setStartScreen] = useState<any>();
  const [showWelcomeScreen, setWelcomeScreen] = useState<any>();
  const [showCompletionScreen, setCompletionScreen] = useState<any>();
  const [gamePlayList, setGamePlayedList] = useState<any>();
  const [questTotalScore, setQuestTotalScore] = useState<any>();
  const [showGamePlay, setGamePlay] = useState<any>();
  const [showScreens, setScreens] = useState<any>();
  const [showBgImage, setBgImage] = useState<any>();
  const [showBgVoices, setBgVoices] = useState<any>();
  const [VoiceDetails, setVoiceDetails] = useState<any>();
  const [leanerProfile, setLeanerProfile] = useState<any>();
  const [completedQuest, setCompletedQuest] = useState<any>();
  const [PlayQuestNo, setGamePlayQuest] = useState<any>();
  const [countries, setCountries] = useState([]);
  const [assignedData, setFormData] = useState([]);
  const [initialBlockId, setInitialBlockId] = useState<any>();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [BlockNo, setBlockNo] = useState<any>(),
    [img, setImg] = useState<any[]>([]),
    [enter, setEnter] = useState(false),
    [fil, setFil] = useState<string>(''),
    [bgIndex, setBgIndex] = useState<number>(),
    [datas, setDatas] = useState<any>();

  // vignesh 08-01-24
  const [formData, setData] = useState({
    galGameId: null,
    galLearnerId: null,
    galGameState: 'level_0',
    galBlockId: null,
    galQuestionState: null,
    galTimeSpent: null,
    galAverageScore: null,
    galStartDateTime: null,
    galEndDateTime: null,
  });
  const [currentTab, setCurrentTab] = useState<any>(0),
  [permission, setPermission] = useState<any>({setting: false, profile: false, overview: false}),
  [rangeValue, setRangeValue] = useState<any>({musicVolume: 70, voiceVolume: 20,}),
  [informationScreen, setInformationScreen] = useState<any>('');  

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  let [tabState, setTabState] = useState('Creation');
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
      console.log('assignedData', assignedData)
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


  const fetchGamePlay = async () => {
    try {
      const result = await getGamePlay(id);
      if (result.status !== 'Success') {
        console.log('Game Error');
        return false;
      }
      console.log('assignedDatad', result)
      setLeanerProfile(result.learnerProfile)
      console.log('leanerProfile', result.learnerProfile)
      setQuestList(result.QuestList)
      setStartScreen(result.StartScreen.gameTitle)
      setWelcomeScreen(result.WelcomeScreen)

      setGamePlay(result.gameplay)
      setScreens(result.screens)
      setBgImage(result.BackgroundVoice.BackgroundImage);
      setBgVoices(result.BackgroundVoice);
      setVoiceDetails(result.BackgroundVoiceObject);
      setCompletionScreen(result.completionScreen);
      setGamePlayedList(result.Playstatus);
      setQuestTotalScore(result.questScore)
      
      /************************** */
      const getCountry = await getCountries();
      if (getCountry.length === 0) return console.log('cannot get Data');
      setCountries(getCountry.data);

    } catch (error) {
      console.error('Error fetching assigned games:', error);
    }
  };
  useEffect(() => {
    fetchGamePlay();
  }, []);

  // vignesh 08-01-24
  const handlePlayGames = async (formdata: any) => {
    const datast = JSON.stringify(formdata)
    const result = await playgame(datast);
    return result;
  }

  const handlePlayQuest = async (questNo: any) => {

    // activityCreate
    const data = {
      gameId: id,
      questNo: questNo,
      galBlockId: '',

    }

    const datas = JSON.stringify(data)
    console.log('data', datas)
    const result = await activityCreate(datas);
    if (result.status !== 'Success') {
      console.log('result',)
      return false;
    } else {

      setGamePlayQuest(questNo);
      console.log('result', result.data)
      localStorage.setItem('activityId', result.data);
      setCurrentTab(currentTab + 1)
    }

    return false;
  }


  const handleNextTab = async () => {
    if (currentTab == 6) {
      console.log('complete')
    } else {
      if (currentTab === 2) {
        const data = JSON.stringify(leanerProfile)
        console.log('data', data)
        const result = await profileUpdate(data);

        console.log('result', result)
        setCurrentTab(currentTab + 1)
        return false;
      }



      // console.log('currentTab', currentTab)
      setCurrentTab(currentTab + 1)
    }

  }

  // vignesh 08-01-24
  const handleViewGame = async (gid: any) => {

    try {


      const element = document.getElementById('container');
      if (element) {        
          if (!document.fullscreenElement) {
            element.requestFullscreen().catch((err) => {
              console.error('Error attempting to enable fullscreen:', err.message);
            });
          }        
      }

      const getData = localStorage.getItem('datas');

      const result = await getAssignedGame(id);

      // assignedData.map((item)=> {
      //   console.log('get',result?.data);      
      //   dispatch({ type: 'level_1', payload: result?.data?.[0].gasAssetImage, gameTitle: result?.data?.[0].gameTitle });   
      // })

      const res = await lastGame(gid, id);
      if (res?.data?.galGameState === undefined || res?.data?.galGameState === '' || res?.data?.galGameState === null) {
        setData((prevData) => ({
          ...prevData,
          galGameId: gid,
          galGameState: "level_1"
        }));
        // dispatch({ type: "level_1" });
        dispatch({ type: 'level_1', payload: result?.data?.[0].gasAssetImage, gameTitle: result?.data?.[0].gameTitle });
      } else {

        setData((prevData) => ({
          ...prevData,
          galGameId: gid,
          galGameState: res?.data?.galGameState
        }));
        dispatch({ type: res?.data?.galGameState });

      }

    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    handleViewGame(1);
  }, []);
  const handleClose = async () => {
    const element = document.getElementById('container');
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.log(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
    }
    navigate('/game/gamePlay')
    dispatch({ type: 'level_0' })
    // setPlay(false)  
  }

  const ComponentsName = [
    FirstScreen,
    WelcomeScreen,
    PlayerDetails,
    CharterSelection,
    NoOfQueue,
    GamePlayScreen,
    CompletionScreen,
  ];
  const DynamicComponent = ComponentsName[currentTab];


  const InformationCompo = () => {
    if(informationScreen == 'Overview') {
      return <GameOverview />
    }
    else if(informationScreen == 'Profile') {
      return <PlayerDetails />
    }
    else if(informationScreen == 'Leaderboard') {
      return <Leaderboard />
    }
    else {
      return false;
    }
  };


  useEffect(() => {
    localStorage.setItem('datas', datas);
  }, [datas])

  useEffect(() => {
    const getData = localStorage.getItem('datas');
    dispatch({ type: getData })
  }, [])

  useEffect(() => {
    // Disable zooming on mouse scroll
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  
  // FOR TOP MENU ***************************************
  
  // ONCLICK EVENT
  const handleProfile = () => {  
    // setInformationScreen('Profile')   
    setCurrentTab(2) 
  }
  const handleOverview = () => {  
    setInformationScreen('Overview')
    setPermission({...permission, overview: permission.overview ? false : true, profile: permission.profile ? false : true})
  }
  const handleSetting = () => {
    console.log('clicked')
    setPermission({...permission, setting: permission.setting ? false : true})
  }
  const handleHome = () => {
    setCurrentTab(0);
  }
  const handleReplay = () => {
    setCurrentTab(5)    
    const founditem: any = Object.values(showGamePlay?.items)
    setBlockNo(founditem[0]?.id);      
  }
  const handleCloseInfoScrn = () => { setInformationScreen('') }

  //ONCHANGE EVENT
  const handleMusicVolume = (e: any) => {    
    setRangeValue({...rangeValue, musicVolume: e})    
  }
  const handleVoiceVolume = (e: any) => {
    console.log('range', e)    
    setRangeValue({...rangeValue, voiceVolume: e})
  }

  let totalScore = 0;
  for (let i = 0; i < gamePlayList?.length; i++) {
    const score = gamePlayList[i].galAverageScore !== null ? gamePlayList[i].galAverageScore : 0;
    totalScore += score;                    
  }  


  // Afrith-modified ****************
  useEffect(() => {
    // Calculate total items count
    let totalItems = Object.keys(showGamePlay?.items || {}).length;
  
    const items = showGamePlay?.items || {};
    const itemValues = Object.values(items);
    const itemIds = itemValues.map((item:any) => item.id);  
  
    let total_progress = 0;
    const index = itemIds.indexOf(BlockNo);
    if (index !== -1) {
      total_progress = (index + 1) * 10;
    }
  
    const max_possible = 100 * totalItems;  
    const progress = (total_progress / max_possible) * 100;
    const progressCalc = Math.floor(progress * 100) / 10;  
    setProgressPercentage(progressCalc);
  }, [BlockNo]);


  useEffect(() => {
    const handleContextmenu = (e: any) => {
        e.preventDefault();                
    }   
    const handleKeyPress = (event: any) => {   
      if (event.key === 'F5' || event.key === 'F12' || 
         (event.ctrlKey === true && event.key === 'r') || 
         (event.ctrlKey === true && event.key === '+') ||
         (event.ctrlKey === true && event.key === '-')) {
        event.preventDefault();         
      }
      console.log('+++', event.key)     
    };
    document.addEventListener('contextmenu', handleContextmenu)           
    window.addEventListener('keydown', handleKeyPress);   
    return function cleanup() {
        document.removeEventListener('contextmenu', handleContextmenu)
        window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);


  // Conditions ********//
  const ShowTopMenu = currentTab !== 0 && currentTab !== 5 && informationScreen == '' && currentTab !== 6;
  const ShowTopMenuInNDI = currentTab === 5 && informationScreen == '' && currentTab !== 6; 
  
  // About Conditions //
  // # informationScreen is a state, that will show the component such as Profile, Leaderboard and Overview screen. These screens icons are in Top Menu. When the informationSCreen is not empty value we dont show top menu on any screens.
    
    
  return (
    <>
      <Box id='container' className='Play-station'>
        <Box className='top-menu-home-section'>
          {ShowTopMenu ? 
            <>
              <Img src={TopMenu} className='top-menu-img' /> 
              <Tooltip label="Profile" 
                 display={'flex'} 
                 justifyContent={'center'} 
                 alignItems={'center'}                
                 background={'transparent'} 
                 boxShadow={'unset'} 
                 backgroundImage={TooltipImg} 
                 backgroundRepeat={'no-repeat'} 
                 backgroundSize={'contain'} 
                 backgroundPosition={'center'}
                 filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                                                 
                 padding={'10px'}
                 height={'70px'}
                 w={'150px'}                 
                 fontSize={'29px'}                  
                 fontFamily={'Atlantis'}
                 color={'#000'}
                 overflow={'hidden'}
                 lineHeight={'25px'}
              >
                  <Img src={Profile} className='profile-img' onClick={handleProfile} />
              </Tooltip>
              <Tooltip label="Progress" 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'} 
                background={'transparent'} 
                boxShadow={'unset'} 
                backgroundImage={TooltipImg} 
                backgroundRepeat={'no-repeat'} 
                backgroundSize={'contain'} 
                backgroundPosition={'center'}
                filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                 
                padding={'10px'}
                height={'70px'}
                w={'150px'}
                fontSize={'29px'}
                fontFamily={'Atlantis'}
                color={'#000'}
                overflow={'hidden'}
                lineHeight={'25px'}
              >
                {/* <Box className='progress-box'>
                  <Text className='text'>10%</Text>
                  <Box className='progressing'>                    
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                  </Box>
                </Box> */}
                <Box className='progress-box'>
                  <Text className='text'>{BlockNo ? Math.floor(progressPercentage) : 0}%</Text>
                  <Box className='progressing'>
                    {Array.from({ length: Math.floor(progressPercentage / 10)}, (_, index) => (
                      <Box key={index} className='level'></Box>
                    ))}
                  </Box>
                </Box>
              </Tooltip>
              <Tooltip label="Score" 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'} 
                background={'transparent'} 
                boxShadow={'unset'} 
                backgroundImage={TooltipImg} 
                backgroundRepeat={'no-repeat'} 
                backgroundSize={'contain'} 
                backgroundPosition={'center'}
                filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                 
                padding={'10px'}
                height={'70px'}
                w={'150px'}
                fontSize={'29px'}
                fontFamily={'Atlantis'}
                color={'#000'}
                overflow={'hidden'}
                lineHeight={'25px'}
              >
                <Box className='score-box'>
                  <Text className='text'>{totalScore == 0 ? 100 : totalScore }</Text>
                </Box>
              </Tooltip>   
              <Tooltip label="Game Overview" 
                 display={'flex'} 
                 justifyContent={'center'} 
                 alignItems={'center'} 
                 background={'transparent'} 
                 boxShadow={'unset'} 
                 backgroundImage={TooltipImg} 
                 backgroundRepeat={'no-repeat'} 
                 backgroundSize={'contain'} 
                 backgroundPosition={'center'}
                 filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                                                
                 padding={'10px'}
                 height={'70px'}
                 w={'150px'}
                 fontSize={'29px'}
                 fontFamily={'Atlantis'}
                 color={'#000'}
                 overflow={'hidden'}
                 lineHeight={'25px'}
              >               
                  <Img src={Overview} className='overview-img' onClick={handleOverview} />               
              </Tooltip>              
              <Tooltip label="Setting" 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'} 
                background={'transparent'} 
                boxShadow={'unset'} 
                backgroundImage={TooltipImg} 
                backgroundRepeat={'no-repeat'} 
                backgroundSize={'contain'} 
                backgroundPosition={'center'}
                filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                 
                padding={'10px'}
                height={'70px'}
                w={'150px'}
                fontSize={'29px'}
                fontFamily={'Atlantis'}
                color={'#000'}
                overflow={'hidden'}
                lineHeight={'25px'}
              >
                <Img src={Setting} className='setting-img' onClick={handleSetting} />
              </Tooltip>                         
            </>
          : ShowTopMenuInNDI ?
            <>
              <Img src={TopMenuNDI} className='NDI top-menu-img' /> 
              <Tooltip label="Home Page" 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'} 
                background={'transparent'} 
                boxShadow={'unset'} 
                backgroundImage={TooltipImg} 
                backgroundRepeat={'no-repeat'} 
                backgroundSize={'contain'} 
                backgroundPosition={'center'}
                filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                                                
                padding={'10px'}
                height={'70px'}
                w={'150px'}
                fontSize={'29px'}
                fontFamily={'Atlantis'}
                color={'#000'}
                overflow={'hidden'}
                lineHeight={'25px'}
              >               
                  <Img src={HomePage} className='NDI home-img' onClick={handleHome} />               
              </Tooltip>
              <Tooltip label="Replay" 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'}                
                background={'transparent'} 
                boxShadow={'unset'} 
                backgroundImage={TooltipImg} 
                backgroundRepeat={'no-repeat'} 
                backgroundSize={'contain'} 
                backgroundPosition={'center'}
                filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                                                 
                padding={'10px'}
                height={'70px'}
                w={'150px'}                 
                fontSize={'29px'}                  
                fontFamily={'Atlantis'}
                color={'#000'}
                overflow={'hidden'}
                lineHeight={'25px'}
              >
                  <Img src={Replay} className='NDI replay-img' onClick={handleReplay} />
              </Tooltip>     
              <Tooltip label="Progress" 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'} 
                background={'transparent'} 
                boxShadow={'unset'} 
                backgroundImage={TooltipImg} 
                backgroundRepeat={'no-repeat'} 
                backgroundSize={'contain'} 
                backgroundPosition={'center'}
                filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                 
                padding={'10px'}
                height={'70px'}
                w={'150px'}
                fontSize={'29px'}
                fontFamily={'Atlantis'}
                color={'#000'}
                overflow={'hidden'}
                lineHeight={'25px'}
              >
                <Box className='NDI progress-box'>
                  <Text className='text'>10%</Text>
                  <Box className='progressing'>
                    {/* use Map based on Current tab or any*/}
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                    <Box className='level'></Box>                  
                  </Box>
                </Box>
              </Tooltip>        
              <Tooltip label="Score" 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'} 
                background={'transparent'} 
                boxShadow={'unset'} 
                backgroundImage={TooltipImg} 
                backgroundRepeat={'no-repeat'} 
                backgroundSize={'contain'} 
                backgroundPosition={'center'}
                filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}                 
                padding={'10px'}
                height={'70px'}
                w={'150px'}
                fontSize={'29px'}
                fontFamily={'Atlantis'}
                color={'#000'}
                overflow={'hidden'}
                lineHeight={'25px'}
              >
                <Box className='NDI score-box'>
                  <Text className='text'>100</Text>
                </Box>
              </Tooltip>              
            </>
          : null
          }    

          {permission.setting ?
            <Box className='Setting-box'>
              <Img src={SettingPad} className='setting-pad' />
              <Box className='music-volume volumes'>
                <Slider aria-label='slider-ex-4' defaultValue={30} name='musicVolume' onChange={handleMusicVolume} value={rangeValue?.musicVolume}>
                  <SliderTrack className='slider-track'  height='15px' borderRadius='80px'>
                    {/* <Img src={VolumeTrack} /> */}
                    <SliderFilledTrack className='filled-volume' bg='pink.500' />
                  </SliderTrack>
                  <SliderThumb boxSize={9} background={'transparent'} left={'calc(100% - 30%)'}>
                    {/* <Box color='tomato' as={MdCall} /> */}
                    <Img src={SliderPointer} />
                  </SliderThumb>
                </Slider>
              </Box>
              <Box className='voice-volume volumes'>
                <Slider aria-label='slider-ex-4' defaultValue={30} name='voiceVolume' onChange={handleVoiceVolume} value={rangeValue?.voiceVolume}>
                  <SliderTrack className='slider-track' height='15px' borderRadius='80px'>
                    <SliderFilledTrack className='filled-volume' bg='pink.500' />
                  </SliderTrack>
                  <SliderThumb boxSize={9} background={'transparent'}>
                    <Img src={SliderPointer} />
                  </SliderThumb>
                </Slider>
              </Box>
              <Box className='btns'>
                <Button className='back-btn btn'><Img src={Back} onClick={()=> setPermission({...permission, setting: false})} /></Button>
                <Button className='okay-btn btn'><Img src={Okay} /></Button>
              </Box>
            </Box>
          : <Box className='Setting-box off'></Box> }

        </Box>
        <DataContext.Provider value={{
          "Function": { handleClose: handleClose, dispatch: dispatch, handlePlayGames: handlePlayGames, handleNextTab: handleNextTab, handlePlayQuest: handlePlayQuest, handleCloseInfoScrn },
          "Response": assignedData,
          "State": { state, showQuestList, showStartScreen, showWelcomeScreen, showCompletionScreen, showGamePlay, showScreens, showBgImage, showBgVoices, setCurrentTab, informationScreen, setInformationScreen,  completedQuest, leanerProfile, countries, setLeanerProfile, PlayQuestNo,gamePlayList,questTotalScore, BlockNo, setBlockNo }
        }}>          
          {informationScreen !== '' ? InformationCompo() : <DynamicComponent />}
        </DataContext.Provider>
      </Box>
    </>
  );
};

export default GamePlayArea;
