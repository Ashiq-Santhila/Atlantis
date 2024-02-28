import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Checkbox, Img, Input, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md'
import { motion } from 'framer-motion';

// Images
import InteractionPad from 'assets/img/games/parch.png';
import FeedbackPad from 'assets/img/games/feedback.png';
import FeedbackText from 'assets/img/games/feedback-text.png';
import DialogPad from 'assets/img/games/dialog.png';
import LeftBtn from 'assets/img/games/left.png';
import RightBtn from 'assets/img/games/right.png';
import On from 'assets/img/games/on.png';
import Off from 'assets/img/games/off.png';


import { API_SERVER } from 'config/constant';
import { DataContext } from '../components/gamePlayArea';

interface InteractionProps {
  inputId?: any,
  id?: any,
  handleNextBlock?: any,
  showResponseTab?: any,
  setShowResponseTab?: any,
  selectBlockValue?: any,
  setSelectBlockValue?: any,
  setScoreSent?:any,
}


const Interaction: React.FC<InteractionProps> = ({ inputId, id, handleNextBlock, showResponseTab, setShowResponseTab, selectBlockValue, setSelectBlockValue,setScoreSent }) => {

  const useData = useContext(DataContext);
  const [navigateTo, setNavigateTo] = useState<any>(),
  [navigateObjects, setNavigateObjects] = useState<any>(),
  [greenEffect, setGreenEffect] = useState<any>(0),
  [qpResponse, setQpResponse] = useState<any>(null),  
  [feedbackTab, setFeedbackTab] = useState<any>({
    tab : false,
    option: '',
  });  


  const inputKey = `Interaction${inputId}`;
  const InteractionDetails = useData?.State?.showGamePlay?.input[inputKey]  
  const alpList = useData?.State?.showGamePlay?.alp
  const filteredOption = Object.values(alpList).filter((item: any) => item?.seqs === `${id}`);  


  const handleCheckboxChange = (option: any, navigateto: any) => {
    console.log('option',navigateto)
    setNavigateTo(navigateto);
    let tutorial = 0
    tutorial++
    setGreenEffect(tutorial)    
    
    const gameInteraction = useData?.State?.showGamePlay?.input[inputKey]                
    
    // setScoreSent
   const checkAns= gameInteraction.ansObject[navigateto];
   if(checkAns==='true'){
    const getscore=gameInteraction.scoreObject[navigateto];
    setScoreSent(getscore)
   }

    for (const key in gameInteraction.responseObject) {  
      if(key === navigateto) {        
        setQpResponse(gameInteraction.responseObject[key])        
      }           
    }
    for (const key in gameInteraction.feedbackObject) {  
      if(key === navigateto) {        
        setFeedbackTab({...feedbackTab, option: gameInteraction.feedbackObject[key]})        
      }           
    }
    for (const key in gameInteraction.navigateshowObjects) {  
      if(key === navigateto) {           
        // Need to insert numeric value only but gameInteraction.navigateshowObjects are providing numeric and text values so need to recognize and push or insert the numberic value to setSelectBlockValue. if in case forgot to push without num value, you can't go next action or not work properly. And this state is coming from GamePlayScreen Compo and it used for New Block and Select Block - Ashiq's Comment.

        // setSelectBlockValue(navigateto === 'A' ? gameInteraction.navigateObjects[key] : null)
        setSelectBlockValue(!isNaN(gameInteraction.navigateObjects[key]) && gameInteraction.navigateObjects[key] !== '' ? gameInteraction.navigateObjects[key] : null)
        setNavigateObjects(gameInteraction.navigateObjects[key])           
      }         
    }
  }  
  
  const callMultiFunction = (currentPart: string) => {    

    if(qpResponse && currentPart !== 'response' && currentPart === 'interaction' && selectBlockValue == null) 
    {      
      setShowResponseTab(true)       
      handleNextBlock(inputId,'interaction', navigateObjects,id);          
    } 
    else if (feedbackTab.option !== '' && currentPart === 'response' && selectBlockValue == null) {
      setShowResponseTab(false)      
      setFeedbackTab({...feedbackTab, tab: true});
      handleNextBlock(inputId, 'interaction', navigateObjects,id); 
    }
    else 
    {        
      setShowResponseTab(false)      
      setFeedbackTab({...feedbackTab, tab: false});
      handleNextBlock(inputId,  'interaction', navigateObjects,id, selectBlockValue); 
    }

  }
  

  

  // As for the Interaction Component, there is only one component and also have only one next btn, that btn will determine which screen should render after click next btn. that's what i wrote these below and above conditions.
  // Three screen's, One is Interaction, another is Response as dialog and another one is Feedback
  // - Ashiq's Comment

  return (
    <>
      {showResponseTab == false && feedbackTab.tab == false ?
        <Box className='img-section inter'>
          <motion.div initial={{ translateX: -800 }} animate={{ translateX: 0 }} transition={{ duration: 0.8, delay: 0.5, type: 'tween' }} style={{position: 'absolute', left: '-25%', width: '100%'}} >                    
            <Box className='InteractionBox'>
              <Img className='interaction-pad' src={InteractionPad} loading="lazy" />
              <Text className='title'>{'Interaction'}</Text>
              <Box className='content-box'>
                <Text className='text'>
                  {InteractionDetails?.interaction}
                </Text>
                {filteredOption.map((item: any, index) => {
                      console.log('filteredOption',filteredOption, '', item.option === navigateTo)
                  return (
                  <React.Fragment key={index}>                            
                    <Checkbox className='checkbox' isChecked={item.option === navigateTo} value={item.option} onChange={(e) => handleCheckboxChange(e, item.option)}>                                       
                        <Img src={item.option === navigateTo ? On : Off}  />                        
                      <Box className='content-option'>
                        <Text className='text'> {InteractionDetails.optionsObject[`${item.option}`]} </Text>  
                      </Box>
                    </Checkbox>                           
                  </React.Fragment>
                  )
                })}
              </Box>
              <Box className='btns-box'>
                <Button className='btns left-btn'><Img src={LeftBtn} /></Button>                           
                <Button className={`btns right-btn`} name='interaction' onClick={()=>callMultiFunction('interaction')}>
                  {greenEffect === 1 && <Box className='greenEffect'></Box>}
                  <Img src={RightBtn} />
                </Button>                           
              </Box>              
            </Box>                  
          </motion.div>
        </Box>
      : 
        showResponseTab == true ?
        <Box className='img-section dialog inter-response'>
          <div className='bottom-to-top'>      
            <Box className='DialogBox'>
              <Img className='dialog-pad' src={DialogPad} loading="lazy" />
              <Box className='title-box'>
                <Text className='title'>{'Response'}</Text>
              </Box>
              <Box className='content-box'>                        
                  <Text className='text'> {qpResponse} </Text>               
              </Box>
              <Box className='btns-box'>
                <Button className='btns left-btn'><Img src={LeftBtn} /></Button>                           
                <Button className='btns right-btn' name='response' onClick={()=>callMultiFunction('response')}><Img src={RightBtn} /></Button>                           
              </Box>                
            </Box>
          </div>
        </Box>        
      : 
        feedbackTab.tab &&  
        <Box className='img-section inter inter-feedback'>
          <motion.div initial={{ translateX: -800 }} animate={{ translateX: 0 }} transition={{ duration: 0.8, delay: 0.5, type: 'tween' }} style={{position: 'absolute', left: '-25%', width: '100%'}} >                    
            <Box className='InteractionBox'>
              <Img className='feedback-pad' src={FeedbackPad} loading="lazy" />              
              <Img className='feedback-text' src={FeedbackText} loading="lazy" />     
              <Box className='content-box'>
                <Text className='text'>
                  {feedbackTab?.option}
                </Text>                
              </Box>
              <Box className='btns-box'>
                <Button className='btns left-btn'><Img src={LeftBtn} /></Button>                           
                <Button className={`btns right-btn`} name='feedback' onClick={()=>callMultiFunction('feedback')}>                  
                  <Img src={RightBtn} />
                </Button>                           
              </Box>              
            </Box>                  
          </motion.div>
        </Box>      
      }            
    </>
  );
}

export default Interaction
