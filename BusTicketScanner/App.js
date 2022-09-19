import * as React from 'react';
import { Text, View, StyleSheet, TextInput,Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionScreen from "./Scanner"

const LoginScreen = ({navigation}) => {
    const [userName, setUserName] = React.useState("")
    const [pass, setPass] = React.useState("")

     
const getData = async () => {
    try {
      const user_name = await AsyncStorage.getItem('username')
      const pass_word = await AsyncStorage.getItem('password')
      if(user_name !== null) {
        // value previously stored
        console.log(user_name, pass_word)
        if(userName == user_name && pass == pass_word)
          {
             navigation.navigate("Scan")
          }
        else
          {
            Alert.alert("Username or password is wrong.")    
          }

      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }

  
  return(
    <View >
      
      <View style= {{alignItems:"center", marginTop:10}}>
        <Text style={{fontSize:25, color:"blue", fontWeight:"bold"}}>
          Login
        </Text>
      </View>

      <View style={{margin:10}}>
        <View style={{marginBottom:10}}>
          <Text>
            User Name / Email
          </Text>
          <TextInput style={{borderWidth:1}} onChangeText ={setUserName}>
          </TextInput>
        </View>    

      
        <Text>
          Password
        </Text>
        <TextInput secureTextEntry style={{borderWidth:1}} onChangeText ={setPass}>
        </TextInput>
      </View>

      <View style={{ alignItems:"center"}}>
        <Button title="Sign In" onPress={
          getData
        }>
        </Button>
      </View>

      <View style={{ marginTop:15, justifyContent:"center", flexDirection:"row"}} >
        <Text>
          Dont have an account? 
        </Text>
        <Text style={{color:"blue", fontWeight:"bold"}} onPress={()=> navigation.navigate("Register")}> Sign Up here
        </Text>
      </View>
    
    </View>
  )

}

const RegisterScreen = ({navigation}) => 
  {
    const [userName, setUserName] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [con_pass, setConPass] = React.useState("")

    const storeData = async (un, p) => {
      try {
        console.log(un, p)
        await AsyncStorage.setItem('username', un)
        await AsyncStorage.setItem('password', p)
        Alert.alert("A new user is registered now.")
        navigation.navigate("Login")
      } catch (e) {
        // saving error
      }
    }
    
    return(
     <View>
      
      <View style= {{alignItems:"center", marginTop:10}}>
        <Text style={{fontSize:25, color:"blue", fontWeight:"bold"}}>
          Register
        </Text>
      </View>

      <View style={{margin:10}}>
        <View style={{marginBottom:10}}>
          <Text>
            User Name / Email
          </Text>
          <TextInput style={{borderWidth:1}} onChangeText ={setUserName}>
          </TextInput>
        </View>    

      <View style={{marginBottom:10}}>
        <Text>
          Password
        </Text>
        <TextInput secureTextEntry style={{borderWidth:1}} onChangeText ={setPass}>
        </TextInput>
      </View>  

        <Text>
          Confirm Password
        </Text>
        <TextInput secureTextEntry style={{borderWidth:1}} onChangeText ={setConPass}>
        </TextInput>
      </View>

      <View style={{ alignItems:"center"}}>
        <Button disabled={userName=="" || pass=="" || con_pass==""} title="Register" onPress={
          () => {
            if(pass == con_pass)
              {
                storeData(userName, pass)
              }
            else
              {
                Alert.alert("Both password are not same. Try again!");
              } 
          }
        }>
        </Button>
      </View>
   
    </View>
  )
}



  const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Scan" component={TransactionScreen} />

        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  
});
