import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Input,Button,Header, Waiting} from '../../components'
import { Fire } from '../../config'
import { colors, storeData, useForm } from '../../utils'
import { showMessage, hideMessage } from "react-native-flash-message";

const Register = ({navigation}) => {
    const [form, setForm] = useForm({
        fullName: '',
        proffesion : '',
        email: '',
        password: '',

    })
    const [Loding, setLoading] = useState(false)

    const onContinue = () => {
        console.warn(form); 
       
        setLoading(true)
        Fire.auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(success =>{
            setLoading(false)
            setForm('reset')
            //Database
            const data ={
                fullName : form.fullName,
                proffesion : form.proffesion,
                email : form.email,
                uid : success.user.uid,
            }

            Fire.database()
            .ref('users/' +success.user.uid+ '/')
            .set(data)

            storeData('user', data)
            
            navigation.navigate('UploadPhoto', data)
            console.log('register succes : ', success)
        })
        .catch((error)=> {
            setLoading(false)
            // Handle Errors here.
         
            const errorMessage = error.message;
            showMessage({
                message : errorMessage,
                type : 'default',
                backgroundColor : "red",
                color : colors.white,
            })
          });
    }
   
    return (
        <>
        <View style={styles.page}>
            <Header onPress={() => navigation.goBack()} title="Daftar Akun"/>
        <View style={styles.content}>
             <ScrollView showsVerticalScrollIndicator={false}>
             <Input 
             label="Full Name"
             value={form.fullName}
             onChangeText={value => setForm('fullName',value)}/>
            <View style={{height:24}}></View>
            <Input 
            label="Pekerjaan"
            value={form.proffesion}
            onChangeText={value => setForm('proffesion',value)}
             />
            <View style={{height:24}}></View>
            <Input 
            label="Email" 
            value={form.email}
            onChangeText={value => setForm('email',value)}
            />
            <View style={{height:24}}></View>
            <Input 
            label="Password" 
            value={form.password}
            onChangeText={value => setForm('password',value)}
            secureTextEntry
            />
            <View style={{height:40}}></View>
            <Button title="Continue" onPress={onContinue}/>
             </ScrollView>
        </View>
        {Loding && <Waiting />}
        </View>
        
        
        </>
    ) 
}

export default Register

const styles = StyleSheet.create({
    page : {backgroundColor:colors.white, flex:1},
    content :{padding : 40,paddingTop:0}
})
