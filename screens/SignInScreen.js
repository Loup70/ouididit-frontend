import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform} from 'react-native';
import RedButton from '../components/redButton';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function SignInScreen({ navigation }) {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [hideLogo, setHideLogo]=useState(true)

  
const handleSubmit = () => {
  fetch('http://172.20.10.3:3000/users/signin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  }).then(response => response.json())
  .then(data => {
    console.log(data)
    if(data.result === true) 
    navigation.navigate('Home');
    else alert('Wrong email or password !')
    
  }
  )
  }

  return(
 

 <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.logo}/>
    <View style={styles.input}>
    <Input onChangeText={(value) => setEmail(value)} value={email}  placeholder='E-mail'/>
    </View>
    <View style={styles.input}>
    <InputPassword onChangeText={(value) => setPassword(value)} value={password}  placeholder="Password" secureTextEntry={true}/>
    </View>
    <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 18, color: 'black' }}> Choose another account </Text>
   <RedButton buttonText='Sign In'
   onPress={() => handleSubmit()}/>
    <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 18, color: 'black' }}> Not register yet ? Create an account ! </Text>
   <RedButton buttonText='Sign up'></RedButton>
   <View></View>
 </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: '100%',
      // paddingBottom: 100,
      paddingTop: 70,
    },

    logo: {
      resizeMode: 'contain',
      width: '67%',
      height: '35%',
    },
    input:{
      // paddingTop: 25,
      width:'80%'
    },
    text: {
      fontFamily: 'ClashGrotesk-Regular'
    }
    
  });


