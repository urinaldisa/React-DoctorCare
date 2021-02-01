import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ILLogo } from '../../assets';
import { Input,Link,Button, Waiting } from '../../components';
import { colors, storeData, useForm } from '../../utils';
import {Fire} from '../../config';
import { showMessage } from 'react-native-flash-message';
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
    const [form, setForm] = useForm({
        email : '',
        password : '',
    }); 
    const dispatch = useDispatch();

    const login = ()=> {
        console.log('form : ', form)
        dispatch({type : 'loading', value: true})
        //setLoading(true)
        Fire.auth().signInWithEmailAndPassword(form.email, form.password).then(res => {
            console.log('success', res)
            dispatch({type : 'loading', value: false})
            Fire.database()
            .ref(`users/${res.user.uid}/`)
            .once('value')
            .then(resDB => {
                console.log('data user :',resDB.val());
                if(resDB.val()){
                    storeData('user', resDB.val())
                    navigation.replace('MainApp');
                }
            })
        })
        .catch(err => {
            console.log('error : ', err)
            dispatch({type : 'loading', value: false})
            showMessage({
                message : err.message,
                type : 'default', 
                backgroundColor : 'red',
                color : colors.white
            })
        }) 
    }
    return (
        <>
        <View style={styles.page}>
            <ScrollView >
            <ILLogo/>
            <Text style={styles.title}>Login dan Temukan Doktermu</Text>
            <Input 
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
            /> 
            <Input 
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
            />
            <Link title="Forgot the password?" size={12} />
            <Button title="Sign in"onPress={login}/>
            <Link title="Create new account" size={16} align="center" 
           onPress={()=> navigation.navigate('Register')}
        />
            </ScrollView>
            </View>
        </>
    )
}

export default Login;

const styles = StyleSheet.create({
    page : {paddingHorizontal:40, backgroundColor:'white', flex :1},
    title : {
        fontSize: 20,
        fontFamily: 'Nunito-SemiBold',
        color: '#112340',
        marginTop: 40,
        marginBottom: 40,
        maxWidth: 153,}
})
