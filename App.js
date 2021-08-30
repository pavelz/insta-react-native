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
  Text, TextInput,
  useColorScheme,
  View,
  Alert,
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
  return (<NativeRouter><SafeAreaView><View>
    <Text>Goahead and login</Text>
      <Text>Login</Text>
      <TextInput/>
      <Text>Password</Text>
      <TextInput textContentType={"password"} secureTextEntry={true}/>
    <Button title="Login ☠️" onPress={() => {Alert.alert("WOO!")}}/>
  </View></SafeAreaView></NativeRouter>);
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
  highlight: {
    fontWeight: '700',
  },
});

export default App;
