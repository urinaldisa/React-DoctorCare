import React, { useState } from 'react'
import { StyleSheet, Text, View , Image,TouchableOpacity} from 'react-native'
import {Header, Button, Link, Gap} from '../../components';
import { Ilnullphoto, IconAddPhoto, IconDelPhoto } from '../../assets';
import { colors, fonts, storeData } from '../../utils';
import {ImagePicker, lauchCamera, launchImageLibrary} from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import { Fire } from '../../config';

const UploadPhoto = ({navigation, route}) =>{
    const {
fullName, proffesion,uid
    } = route.params
    console.log('fullName : ',fullName)
    console.log('proffesion : ',proffesion)
    console.log('uid : ',uid)
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photoForDB, setPhotoForDB] =useState('')
    const [photo, setPhoto] =useState(Ilnullphoto);
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
                setHasPhoto(true)
            }
           
          });
    }
    const uploadAndContinue = () => {
        Fire.database()
        .ref('users/' + uid + '/')
        .update({photo : photoForDB}) 
        
        const data = route.params;
        data.photo = photoForDB;

        storeData('user', data)
        navigation.replace('MainApp')
    }
    return (
        <View style={styles.page}>
         <Header title="Upload Photo"/>
          
          <View style={styles.content}>
              <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar}/>
            {hasPhoto && <IconDelPhoto style={styles.removePhoto}/>}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto}/>} 
          </TouchableOpacity>
    <Text style={styles.name}>{fullName}</Text>
    <Text style={styles.profesi}>{proffesion}</Text>
          </View>
               <View>
            <Button 
            disable={!hasPhoto}
            title="Upload and Continue" 
            onPress={uploadAndContinue}/>
            <Gap height={30}/>
           <Link title="Skip for this" align="center" size={16} onPress={()=> navigation.replace('MainApp')}/>
               </View>
            
                </View>
</View>
           
       
         
        
    );
};

export default UploadPhoto
const styles = StyleSheet.create({
    page : {flex :1, backgroundColor: colors.white},
    profile : {alignItems: 'center', flex: 1,justifyContent:'center'},
    avatar : {width:110, height: 110, borderRadius : 110/2 },
    content: {paddingBottom:64,paddingHorizontal:40,flex: 1,justifyContent:'space-between'},
    avatarWrapper: {
        width : 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 130/ 2,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPhoto : {position: 'absolute', bottom: 8, right: 6},
    removePhoto : {position: 'absolute', bottom: 8, right: 6},
    name : {fontSize: 24, color: colors.text.primary, fontFamily:fonts.primary[600],textAlign:'center'},
    profesi : {fontFamily: fonts.primary.normal,textAlign:'center',fontSize: 18,}
})
