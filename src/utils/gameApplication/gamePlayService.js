import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod ,urls,postMethodfile,postVoice} from 'utils/url/urls';
const person = localStorage.getItem('user');
const user = JSON.parse(person);

export async function addgame(data) {
  try {
    const person = localStorage.getItem('user');
    const user = JSON.parse(person);    
    const response = await fetch(`${API_SERVER}${urls.addgame}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: user?.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('addgame Error:', err);
  }
} 
export async function getPreview(id) {
  try {
    const response = await fetch(`${API_SERVER}${urls.getpreview}${id}`,getMethod);
    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('getPreview Error:', err);
  }
}
export async function getAllGame(data,type) {
  try {
    const response = await fetch(`${API_SERVER}${urls.gameList}${type}`,putMethod(data));
    const result = await response.json(); 
    return result;
  } catch (err) {
    console.log('getAllGame Error:', err);
  }
}

export async function getImages(id){
    try { 
        const response = await fetch(`${API_SERVER}${urls.getImages}${id}`,getMethod);
        const result = await response.json();
        return result;
      }
    catch (err) {
        console.log('getImages Error:', err.message);
      }
}


export async function getAssignedGame(id){
    try{
        const response = await fetch(`${API_SERVER}${urls.getAssignedGames}${id}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getAssignedGame Error:', err.message);
      }
  }
   
  export async function getBackgrounds(){
    try{
        const response = await fetch(`${API_SERVER}${urls.getBackgrounds}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
   
  export async function getGamePlay(id){
    try{
        const response = await fetch(`${API_SERVER}${urls.getgameplay}${id}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }
  export async function profileUpdate(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.gameprofileUpdate}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

  

  export async function getVoices(id,data) {
    // try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}`,postVoice(data));
      const result = await response.json(); 
      console.log('result Error:', result);
      return result;
    // } catch (err) {
    //   console.log('getCreator Error:', err);
    // }
  }
  export async function getLeaderBoard(id){
    try{
        const response = await fetch(`${API_SERVER}${urls.getleaderboard}${id}`,getMethod);
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

  export async function getDashboard() {
    try {
      const response = await fetch(`${API_SERVER}${urls.gameDashboard}`, getMethod);
      const result = await response.json();
      return result;
    }
    catch (err) {
      console.log('dashboard Error:', err.message);
    }
  }