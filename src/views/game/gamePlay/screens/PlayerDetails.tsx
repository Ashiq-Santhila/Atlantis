import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, FormLabel, Icon, Img, Input, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';


// Games Image
import ProfileCard from 'assets/img/games/profile-card.png';
import FormField from 'assets/img/games/formfield.png';
import NextBtn from 'assets/img/games/next.png';
import OkayBtn from 'assets/img/games/okay.png';
import CancelBtn from 'assets/img/games/cancel.png';
import BackBtn from 'assets/img/games/back.png';
import Background from 'assets/img/games/fristscreenBackground.jpg';
import Arrows from 'assets/img/games/arrows.png';
import LeftArrow from 'assets/img/games/left-arrow.png';
import RightArrow from 'assets/img/games/right-arrow.png';


import { DataContext } from '../components/gamePlayArea';

interface ProfileScreenProps {
}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const useData = useContext(DataContext);

  const countryArr = ['India', 'Albania', 'French'];
  const [dropdownValue, setDropdownValue] = useState<any>('');
  const [toggle, setToggle] = useState<any>(true);

  //Afrith-modified-starts-24/Feb/24////
  const [genderValue, setGenderValue] = useState<any>('');
  const [genderToggle, setGenderToggle] = useState<any>(true);

  const handleDropdown = (item: any) => {
    setDropdownValue(item);
    useData?.State?.setLeanerProfile((prev: any) => ({ ...prev, lenCountryId: item }));
  }

  const handleGenderDropdown = (selectedGender: string) => {
    console.log('Selected Gender:', selectedGender);
    setGenderValue(selectedGender);
    useData?.State?.setLeanerProfile((prev: any) => ({ ...prev, lenGender: selectedGender }));
  }

  //Afrith-modified-ends-24/Feb/24//// 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await useData?.Function?.handlePlayGames();
        console.log('handlePlayGames success:', res);

        console.log('hello');
      } catch (error) {
        console.error('Error in handlePlayGames:', error);
      }
    };

    fetchData(); // Call the async function
  }, []);
  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    const { name, value, checked } = e.target;


    useData?.State?.setLeanerProfile((prev: any) => ({ ...prev, [name]: value }));
  };
  console.log('useData', useData?.State?.leanerProfile)


  console.log('statePayload', useData?.state);
  return (
    <>
      <Box className='Play-game ProfileScreen'>
        <Box position={'fixed'} top={0} left={0} right={0} bottom={0} zIndex={999}>
          <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
            <Box className='img-box' position={'relative'}>
              {/* <Img className='img-bg' src={`${API_SERVER}/${useData?.Response?.[0]?.gasAssetImage}`} />    */}
              <Img className='img-bg' src={useData?.State?.showBgImage} />
              <Box className='img-section'>
                <Img className='img' src={ProfileCard} />
                <Box className='profile-box'>
                  <Box className='box-1'>
                    <Box className='full-name fields'>
                      <FormLabel>
                        Full Name
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                        {/* <Img className='arrows-for-label' src={Arrows} /> */}
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Input type={'text'} value={useData?.State?.leanerProfile?.lenUserName} id='lenUserName' name='lenUserName' onChange={handleChange} />
                    </Box>
                    <Box className='nick-name fields'>
                      <FormLabel>
                        Nick Name
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Input type={'text'} value={useData?.State?.leanerProfile?.lenNickName} id='lenNickName' name='lenNickName' onChange={handleChange} />
                    </Box>
                    <Box className='email fields'>
                      <FormLabel>
                        E-Mail
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Input type={'text'} value={useData?.State?.leanerProfile?.lenMail} readOnly />
                    </Box>
                    <Box className='organization fields'>
                      <FormLabel>
                        Organization
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Input type={'text'} value={useData?.State?.leanerProfile?.lenCompanyId} id='lenCompanyId' name='lenCompanyId' readOnly onChange={handleChange} />
                    </Box>
                    <Box className='country fields'>
                      <FormLabel>
                        Country
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      {/* <Text className='selected-value' onClick={() => setToggle(!toggle)}>
                        {useData?.State?.countries
                          .filter((item: any) => item.value === 2 || item.value === useData?.State?.leanerProfile?.lenCountryId)
                          .map((item: any) => (
                            // Your rendering logic goes here
                            <span key={item.value}>{item.label}</span>
                          ))}
                      </Text> */}
                      <Text className='selected-value' onClick={() => setToggle(!toggle)}>
                        {useData?.State?.countries
                          .filter((item: any) => item.value === Number(useData?.State?.leanerProfile?.lenCountryId))
                          .map((item: any) => {
                            console.log('item', item);
                            return <span key={item.value}>{item.label}</span>;
                          })}
                      </Text>
                      <Box className={`dropdown ${toggle ? 'close' : ''}`}>
                        {useData?.State?.countries.map((item: any) => (
                          <p className='option' onClick={() => (handleDropdown(item.value), setToggle(!toggle))}>{item.label}</p>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Box className='box-2'>
                    <Box className='region fields'>
                      <FormLabel>
                        Region
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Input type={'text'} value={useData?.State?.leanerProfile?.lenRegion} id='lenRegion' name='lenRegion' onChange={handleChange} />
                    </Box>
                    <Box className='department fields'>
                      <FormLabel>
                        Department
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Input type={'text'} value={useData?.State?.leanerProfile?.lenDepartment} onChange={handleChange} id='lenDepartment' name='lenDepartment' />
                    </Box>
                    <Box className='age fields'>
                      <FormLabel>
                        Age
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Input type={'text'} value={useData?.State?.leanerProfile?.lenAge} onChange={handleChange} id='lenAge' name='lenAge' />
                    </Box>

                    {/* <Box className='gender fields'>
                          <FormLabel>
                            Gender
                            <Box className='arrows-box-for-label'>
                              <Img className='left-arrows-for-label' src={LeftArrow} />
                              <Img className='right-arrows-for-label' src={RightArrow} />
                            </Box>
                            </FormLabel>
                          <Img className='formfield' src={FormField} /> 
                          <Input type={'text'} value={useData?.State?.leanerProfile?.lenGender} onChange={handleChange} />
                        </Box> */}
                    {/**********Afrith-modified-starts-24/Feb/24****************/}

                    <Box className='gender fields'>
                      <FormLabel>
                        Gender
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Text className='selected-value' onClick={() => setGenderToggle(!genderToggle)}>
                        {useData?.State?.leanerProfile?.lenGender}
                        {/* {genderValue}  */}
                      </Text>
                      {/* <Input type={'text'} value={useData?.State?.leanerProfile?.lenGender} onChange={handleChange} /> */}
                      <Box className={`dropdown ${genderToggle ? 'close' : ''}`} style={{ zIndex: 1 }}>
                        <p className='option' onClick={() => (handleGenderDropdown("Male"), setGenderToggle(!genderToggle))}>Male</p>
                        <p className='option' onClick={() => (handleGenderDropdown("Female"), setGenderToggle(!genderToggle))}>Female</p>
                      </Box>
                    </Box>
                    <Box className='education fields' mt={10}>
                      <FormLabel>
                        Education
                        <Box className='arrows-box-for-label'>
                          <Img className='left-arrows-for-label' src={LeftArrow} />
                          <Img className='right-arrows-for-label' src={RightArrow} />
                        </Box>
                      </FormLabel>
                      <Img className='formfield' src={FormField} />
                      <Input type={'text'} value={useData?.State?.leanerProfile?.lenEducation} id='lenEducation' name='lenEducation' onChange={handleChange} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className='btns'>
                <Button className='cancel-btn' onClick={() => useData?.State?.setInformationScreen('')}><Img src={useData?.State?.informationScreen !== 'Profile' ? CancelBtn : BackBtn} /></Button>
                <Button className='next-btn' onClick={() => useData?.State?.informationScreen !== 'Profile' ? useData?.Function?.handleNextTab() : useData?.State?.setInformationScreen('')}><Img src={useData?.State?.informationScreen !== 'Profile' ? NextBtn : OkayBtn} /></Button>
              </Box>
            </Box>
            <Button position={'absolute'} top={0} right={0} onClick={() => useData?.Function?.handleClose()}><Icon as={MdClose} /></Button>
          </motion.div>
        </Box>
      </Box>
    </>
  )
}

export default ProfileScreen
