import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {Header,Profile, Input, Button, Gap} from '../../components'
import { colors, getData, storeData } from '../../utils'
import {Fire} from '../../config';
import { showMessage } from 'react-native-flash-message'
import { Ilnullphoto } from '../../assets'
import ImagePicker from 'react-native-image-picker'

const UpdateProfile = ({navigation}) => {
    const [profile, setProfile]= useState({
        fullName: '',
        proffesion: '',
        email: '', 
       
    });
    const [password,setPassword] = useState('')
    useEffect(() => {
        getData('user').then(res =>{
            const data = res; 
            setPhoto({uri: res.photo});
            setProfile (data);
        })
    }, [])

    const update = () =>{
        console.log('profile : ', profile);
        console.log('new password :' , password)
        if (password.length > 0){
            if(password.length < 6 ){
                showMessage({
                    message : 'Password yang anda masukan kurang dari 6 karakter',
                    type : 'default', 
                    backgroundColor : 'red', 
                    color : 'white'
                });
            }else{
            updatePassword()
            updateProfileData()
            navigation.replace('MainApp')
            }
        }else{
            updateProfileData();
    }
    };
    const updatePassword = ()=> {
        Fire.auth().onAuthStateChanged(user =>{
            if(user){
                user.updatePassword(password).catch(err =>{
                    showMessage({
                        message : err.message,
                        type : 'default', 
                        backgroundColor : 'red', 
                        color : 'white'
                    });
                })
            }
        })
    }
    const updateProfileData = ()=> {
        const data = profile;
        data.photo = photoForDB;
        Fire.database()
        .ref(`users/${profile.uid}/`)
        .update(data)
        .then(() => {
            console.log('success : ');
            storeData('user', data);
        })
        .catch(err =>{
            showMessage({
                message: err.message,
                type : 'default',
                backgroundColor: 'red',
                color: colors.white,
            })
        })
    }
    const changeText = (key, value) => {
        setProfile({
            ...profile,
            [key]: value,
        })
    }
    const [photo,setPhoto] = useState(Ilnullphoto);
    const [photoForDB, setPhotoForDB] = useState('')
    const getImage = () => {
        ImagePicker.launchImageLibrary({
            quality : 0.5, 
            maxWidth : 200,
            maxHeight : 200,
        }, response => {
            // Same code as in above section!
            console.log('response : ',response)
            if(response.didCancel ||response.error){
                showMessage({
                    message : 'oops, sepertinya anda tidak memilih foto',
                    type : 'default', 
                    backgroundColor : 'red',
                    color : colors.white
                })
            }else{
                const source = {uri : response.uri}
                setPhotoForDB(`data:${response.type};base64, ${response.data}`); 
                setPhoto(source)
            }
    },)
}
    return (
        <View style={styles.page}>
           <Header title="Edit Profile" onPress={()=>navigation.goBack()}/> 
           <ScrollView showsVerticalScrollIndicator={false}>
           <View style={styles.content}>
           <Profile isRemove photo={photo} onPress={getImage}/>
           <Gap height={26}/>
           <Input label="Full Name" value={profile.fullName} 
           onChangeText={(value) =>changeText('fullName',value)}/>
           <Gap height={24}/>
           <Input label="Pekerjaan" value={profile.proffesion}
           onChangeText={(value) =>changeText('proffesion',value)}
           />
           <Gap height={24}/>
           <Input label="Email"  value={profile.email} disable/>
           <Gap height={24}/>
           <Input label="Password" value={password} secureTextEntry onChangeText={(value) => setPassword(value)}/>
           <Gap height={40}/>
           <Button title="Save Profile" onPress={update}/>
           </View>
           </ScrollView>
           
        </View>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    page : {backgroundColor:colors.white,flex:1},
    content : {padding: 40,paddingTop: 0}
})
