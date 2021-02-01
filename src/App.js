import React, {useState} from 'react';
import { StyleSheet, YellowBox } from 'react-native';
import { Splash, GetStarted } from './pages';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router'
import FlashMessage from "react-native-flash-message"
import {Provider, useSelector} from 'react-redux'
import store from './redux/store';
import { Waiting } from './components';
const MainApp = () => {
const stateGlobal = useSelector(state => state)
  YellowBox.ignoreWarnings(['Setting a timer'])
return(
  <>
  <NavigationContainer>
   <Router />
  </NavigationContainer>
  <FlashMessage position="top" />
  {stateGlobal.loading && <Waiting/>}
  </>
);
};
const App = ()=>{
  return (
    <Provider store={store}>
      <MainApp/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
