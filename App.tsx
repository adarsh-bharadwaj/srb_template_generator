/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Image, KeyboardAvoidingView, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from './src/components/StatusBar';
import { useResponsiveDimensions } from './src/hooks/useResponsiveDimensions';
import CustomTextInput from './src/components/CustomTextInput';
import { COLORS } from './src/constants/colorConstants';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { launchCamera } from 'react-native-image-picker';
import Share from 'react-native-share';
import { appStyles } from './src/styles/appStyles';

const App = () => {
  const { wp, hp, fs } = useResponsiveDimensions();
  const [enableCalendar, setEnableCalendar] = useState(false);
  const [enablePreview, setEnablePreview] = useState(false);
  const [dateText, setDateText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('')
  const [base64, setBase64] = useState('');
  const styles = appStyles();

  useEffect(() => {
    // Add event listener for back button
    const backAction = () => {
      return closeModals()
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Clean up listener on component unmount
  }, [enableCalendar,enablePreview]);

  const closeModals = ()=>{
    if (enableCalendar) {
      setEnableCalendar(false); // Close the modal if it's open
      return true; // Prevent default back action
    }
    if(enablePreview)
    {
      setEnablePreview(false)
      return true;
    }
    return false;
  }

  // const whatsappMessage = async () => {
  // if ("Hi".trim()) {
  //   const url = `whatsapp://send?text=${encodeURIComponent("HI")}&phone=918861137895`;
  //   console.log({ url })
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       console.log({ supported })
  //       // if (supported) {
  //       Linking.openURL(url);
  //       // } else {
  //       //   Alert.alert('Error', 'WhatsApp is not installed on this device');
  //       // }
  //     })
  //     .catch((err) => console.error('An error occurred', err));
  // } else {
  //   Alert.alert('Error', 'Please enter a message');
  // }
  // try {
  //   await Share.share({
  //     message: base64,
  //     url: base64, // Use the Base64 image
  //   }, {
  //     dialogTitle: 'Share to WhatsApp',
  //   });
  // } catch (error) {
  //   console.error('Error sharing to WhatsApp:', error);
  //   Alert.alert('Error', 'Failed to share to WhatsApp');
  // }

  //   const shareOptions = {
  //     title: 'Share via WhatsApp',
  //     message: 'Hello, this is a test message!',
  //     url: base64, // Replace with actual Base64 string
  //     social: Share?.Social?.WHATSAPP,
  //   };

  //   try {
  //     await Share.shareSingle(shareOptions);
  //     console.log('Shared successfully!');
  //   } catch (error) {
  //     console.error('Error sharing:', error);
  //   }
  // };

  const previewImage = () => {
    if (imageUri === '') {
      Alert.alert('Warning', 'Please Capture Image To Preview');
      return;
    }
    setEnablePreview(true)
  }

  const generate = async () => {
    if (name === '') {
      Alert.alert('Warning', 'Please Enter Customer Name');
      return
    }
    if (phone === '') {
      Alert.alert('Warning', 'Please Enter Customer Phone Number');
      return
    }
    if (description === '') {
      Alert.alert('Warning', 'Please Enter Set Description');
      return
    }
    if (dateText === '') {
      Alert.alert('Warning', 'Please Enter Date');
      return
    }
    if (base64 === '') {
      Alert.alert('Warning', 'Please Capture Image');
      return
    }

    const message = `*Name:* ${name}\n*Phone No.:* ${phone}\n*Description:* ${description}\n*Date:* ${dateText}`;

    const shareOptions = {
      title: 'Share via WhatsApp',
      message,
      url: base64, // Replace with actual Base64 string
      social: Share?.Social?.WHATSAPP,
    };

    try {
      await Share.shareSingle(shareOptions);
      console.log('Shared successfully!');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  const captureImage = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1, // High quality
      includeBase64: true, // Directly get Base64 string
    };

    await launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image capture was cancelled');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const base64 = response.assets[0].base64;
        const uri = response.assets[0].uri;
        console.log({ response: response.assets })
        // const uri = response.assets[0].uri;

        setImageUri(uri);
        setBase64(`data:image/jpeg;base64,${base64}`);
      }
    }).catch((error) => console.log(error));
  }

  const reset = () => {
    setDateText('');
    setSelectedDate('');
    setImageUri('');
    setName('');
    setPhone('');
    setDescription('')
    setBase64('');
  }

  return (

    <KeyboardAvoidingView behavior='height' enabled={true} contentContainerStyle={styles.keyboardAvoidViewContentContainer}>
      <StatusBar />

      <ScrollView scrollEnabled={true} contentContainerStyle={styles.scrollContentContainer}>

        <Image resizeMode='contain' style={styles.logoImage} source={require('./src/assets/logo.png')} />

        <View style={styles.titleTextContainer}>
          <Text style={[{ fontSize: fs(2.2) }, styles.titleText]}>{'Rental Set Template Generator'}</Text>
          <Text style={[styles.titleText, { fontSize: fs(1.9) }]}>{'v 0.1'}</Text>
        </View>

        <View style={styles.formContainer}>

          <View style={styles.topButtonsContainer}>
            <TouchableOpacity onPress={captureImage} style={[{ backgroundColor: base64 === '' ? COLORS.themePrimaryColor : '#32a852' }, styles.topButton]}>
              <Text style={styles.topButtonText}>{base64 === '' ? 'Capture Image' : 'Captured Image ✔'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={previewImage} style={[{ backgroundColor: COLORS.themePrimaryColor }, styles.topButton]}>
              <Text style={styles.topButtonText}>{'Preview'}</Text>
            </TouchableOpacity>
          </View>

          <CustomTextInput value={name} onChangeText={(value) => setName(value)} label='Name' placeholder='Enter Name' />
          <CustomTextInput value={phone} maxLength={10} onChangeText={(value) => setPhone(value)} label='Phone No.' placeholder='Enter Phone No.' keyboardType='number-pad' />
          <CustomTextInput value={description} onChangeText={(value) => setDescription(value)} textInputContainerStyle={styles.descriptionInputContainer}
            style={styles.descriptionInput} multiline={true} numberOfLines={6} label='Set Description' placeholder='Enter Set Description' />

          <View style={styles.calendarInputContainer}>

            <View style={styles.calendarLabelContainer}>
              <Text style={styles.calendarLabel}>{'Booked On'}</Text>
            </View>

            <TouchableOpacity onPress={() => setEnableCalendar(true)} style={styles.calendarInput}>
              <Text style={styles.calendarInputText}>{dateText === '' ? 'Select Date' : dateText}</Text>
              {/* <TextInput
              {...props}
            /> */}
            </TouchableOpacity>

          </View>

        </View>

        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity onPress={generate} style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Generate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {enableCalendar && (
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setEnableCalendar(false)} style={styles.modalBackDrop} />
          <View style={styles.calendarPickerContainer}>
            <CalendarPicker selectedStartDate={selectedDate} width={wp(90)} onDateChange={(value: Date) => { setSelectedDate(value); setDateText(moment(value).format('DD-MM-YYYY')); setEnableCalendar(false) }} />
          </View>
        </View>
      )}

      {enablePreview && (
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setEnablePreview(false)} style={styles.modalBackDrop} />
          <Image source={{ uri: imageUri }} resizeMode='contain' style={styles.previewImage} />
        </View>
      )}

    </KeyboardAvoidingView>
  )
}

export default App;