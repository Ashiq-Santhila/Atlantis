// src/App.tsx
import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {getDashboard} from 'utils/gameApplication/gamePlayService';

function Dashboard() {

  const [data, setData]   = useState<any>({
    count : 0,
    name : '',
  });

  const handleFetchDashboard = async () => {
    const response = await getDashboard();
    const result = response?.data;

    setData({...data, count: result?.gameCounts, name: result?.userDetails?.name, title: result?.gameTitle.join(', ')})
    console.log('result',result)
  }

  useEffect (()=> {
    handleFetchDashboard()    
  },[])


  return (
    <Box className="App" mt={'100px'} p={'20px'}>
      <header className="App-header">
        <h1>Hello, Atlantis!</h1>
        <Text>User Name: {data.name}</Text>
        <Text>Game Count: {data.count}</Text>
        <Text>Game Titles: {data.title}</Text>
      </header>
    </Box>
  );
}

export default Dashboard;
