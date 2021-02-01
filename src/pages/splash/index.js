import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ILLogo } from '../../assets'
import { Fire } from '../../config'


const Splash = ({navigation}) => {
  useEffect(() => {
   const unsubscribe = Fire.auth().onAuthStateChanged((user)=>{
    setTimeout(() =>{
      
      if(user){
        navigation.replace('MainApp');
      }else{
        navigation.replace('GetStarted')
      }
  },3000);
   })
    return () => unsubscribe();
  },[navigation])
  
    return (
        <View style={styles.page}>
          <ILLogo />
          <Text style={styles.title}>My Doctor</Text>
        </View>
      )
}

export default Splash;

const styles = StyleSheet.create({
    page : {backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'},
    title : {fontSize:20,marginTop:20,fontWeight:'600',color:'#112340'},
})
