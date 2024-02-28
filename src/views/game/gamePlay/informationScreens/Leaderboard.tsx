import React, { useContext,useEffect,useState } from 'react'
import { Box, Button, Flex, Img, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { motion } from 'framer-motion';

import LeaderBoardPad from 'assets/img/games/leaderboard-parts/leaderboard-pad.png';
import ListPad from 'assets/img/games/leaderboard-parts/list-pad.png';
import CloseBtn from 'assets/img/games/leaderboard-parts/close-btn.png';

import { DataContext } from '../components/gamePlayArea';
import { getLeaderBoard } from 'utils/gameApplication/gamePlayService';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Leaderboard = () => {
    const useData = useContext(DataContext)  
    const { id } = useParams();
    const datas = [
        {name: 'Master'},
        {name: 'Kiya'},
        {name: 'Bafop Arla'},
        {name: 'Tanny Pol'},
    ];
    const [leaderBoard, setLeaderBoard] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getLeaderBoard(id);
            console.log('result',result)
            if(result.status!=='Success'){
                console.log('error in leaderBoard')
                return false
            }
            setLeaderBoard(result.data);
            // Handle the result here, for example, set it to a state variable
            // 
          } catch (error) {
            console.error('Error fetching LeaderBoard:', error);
          }
        };
      
        fetchData(); // Call the async function
      
        return () => {
          // Cleanup logic (if needed)
          // For example, cancel any ongoing requests, clear subscriptions, etc.
        };
      }, []); // Add any dependencies that should trigger a re-run of the effect when they change
      
    //    {leaderBoard && leaderBoard.map((item:any, index:any) => (
    //     <Box className='list'>
        //     <Img src={ListPad} />  
        //     <Text>{item.learnerId}</Text>  
        //     <Text>{index+1}</Text>      
        //     <Text>{item.totalAverageScore??0}</Text>      
        // </Box>     
    //  ))}

    console.log('leaderBoard',leaderBoard)
  return (
    <>
        <Box className='Play-game Leaderboard-box'>
            <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.3, delay: 0.5 }} >
                <Box className='img-box'>
                    <Img className='img-bg' src={useData?.State?.showBgImage} /> 
                    <Box className='img-section'>
                        <Img src={LeaderBoardPad} className='leaderboard-pad' />
                        <Img src={CloseBtn} className='close-btn' onClick={()=> useData?.Function?.handleCloseInfoScrn()} />
                        <Box className='content-box'>                           
                            {/* {leaderBoard && leaderBoard.map((item:any, index:any) => (
                                <Box className='list'>
                                    <Img src={ListPad} />  
                                    <Flex className='list-items'>
                                        <Text>{item.learnerId}</Text>  
                                        <Text>{index+1}</Text>      
                                        <Text>{item.totalAverageScore??0}</Text>      
                                    </Flex>                                    
                                </Box>     
                            ))} */}
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>S.No</Th>
                                        <Th>Name</Th>
                                        <Th>Position</Th>
                                        <Th>Score</Th>
                                    </Tr>
                                </Thead>
                                <Tbody  className='list'>
                                    {leaderBoard && leaderBoard.map((item:any, index:any) => {
                                        let indexNo = 1;
                                        return (
                                        <>
                                            <Img src={ListPad} />  
                                            <Tr className='list-items'>
                                                <Td>{indexNo++}</Td>
                                                <Td>{item.learnerId}</Td>
                                                <Td>{index+1}</Td>
                                                <Td>{item.totalAverageScore??0}</Td>
                                            </Tr>                                            
                                        </>
                                    )})}
                                </Tbody>
                            </Table>
                        </Box>
                    {/* <Button className='close'  position={'absolute'} zIndex={999}>Close</Button>             */}
                    </Box>
                </Box>
            </motion.div>
        </Box>
    </>
  )
}

export default Leaderboard
