/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import type {Node} from 'react';
import {Switch, NativeRouter, Route, Link } from "react-router-native";

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  TextInput,
  useColorScheme,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import StockMessage from './StockMessage';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
function Home(){
  return <StockMessage/>;
}
function Logout(){
  return <Text>Trying to logout</Text>;
}
function Login(){
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");


  const [token, setToken] = useState("");

  return (
    <NativeRouter>
      <SafeAreaView>
        <View>
          <Text>Godhead and login</Text>
          <Text>Login</Text>
          <TextInput value={login} autoCapitalize={'none'} onChangeText={setLogin}/>
          <Text>Password</Text>
          <TextInput value={password} onChangeText={setPassword} textContentType={'password'} secureTextEntry={true} />
          <TouchableOpacity
            color="#ff0000"
            style={styles.button}
            onPress={() => {
              fetch("https://arslogi.ca/users/sign_in", {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  Accept: 'application/json',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                credentials: "include",
                body: JSON.stringify({
                  user: {
                    "email": login,
                    "password": password,
                  },
                }),
              })
              .then(response => {
                console.log("LOGGG");
                fetch('https://arslogi.ca/photos.json')
                  .then(response => response.json())
                  .then(json => {
                    console.log(json);
                  });
                console.log(response);
              }).catch(response => {
                console.log('UH OH');
              });
            }}
          >
            <Text>Login 😆</Text>
          </TouchableOpacity>
          <TouchableOpacity
            color="#ff0000"
            style={styles.button}
            onPress={() => {
              
              fetch('https://arslogi.ca/users/sign_out',{
                method: 'DELETE',
                credentials: 'same-origin',
              })
                .then(response => {
                  console.log(response)
                });
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </NativeRouter>);
}
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [token, setToken] = useState([])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  if( token != null ){
    return Login();
  } else {
    return (
      <NativeRouter>
        <SafeAreaView>
          <View>
            <Link to="/"><Text>Home</Text></Link>
            <Link to="/logout"><Text>Logout</Text></Link>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </View>
        </SafeAreaView>
      </NativeRouter>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4444ff',
    color: '#ff4444',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
