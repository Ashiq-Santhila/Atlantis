import { API_SERVER } from 'config/constant';
import { getMethod, postMethod, putMethod ,urls,postMethodfile,postVoice} from 'utils/url/urls';
const person = localStorage.getItem('user');
const user = JSON.parse(person);

  export async function activityUpdate(data,id){
    try{
        const response = await fetch(`${API_SERVER}${urls.activityUpdate}${id}`,putMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

  export async function activityCreate(data){
    try{
        const response = await fetch(`${API_SERVER}${urls.activityCreate}`,postMethod(data));
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log('getBackgrounds Error:', err.message);
      }
  }

 