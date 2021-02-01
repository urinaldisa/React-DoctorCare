import React from 'react'
import { StyleSheet, Text, View , Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconDelPhoto, Luffy } from '../../../assets'
import { colors, fonts } from '../../../utils'

const Profile = ({name,desc, isRemove ,photo,onPress}) => {
    return (
        <View style={styles.container}>
            {!isRemove && (
                <View style={styles.border}>
                <Image source={photo} style={styles.avatar} />
               
            </View>
            )}
            {isRemove && (
             <TouchableOpacity style={styles.border} onPress={onPress}>
             <Image source={photo} style={styles.avatar} />
             {isRemove && <IconDelPhoto style={styles.removephoto}/>}
         </TouchableOpacity>
           )}
            {name && (
                <View>
            <Text style={styles.nama}>{name}</Text>
            <Text style={styles.profession}>{desc}</Text>
                </View>
            )}
           
        </View>
        
    )
}

export default Profile

const styles = StyleSheet.create({
    container : {justifyContent : 'center',alignItems : 'center'},
    avatar : {width: 110, height : 110, borderRadius: 110/2}, 
    border : {
        width:130,
        height : 130,
        borderRadius : 130/2,
        borderWidth :1,
        borderColor : 'black',
        justifyContent : 'center',
        alignItems : 'center'
    }, 
    nama : {
        fontSize : 20, 
        fontFamily : fonts.primary[600],
        color : colors.text.primary,
        marginTop : 16,
        textAlign: 'center'
    },
    profession: {
        fontSize : 16, 
        fontFamily : fonts.primary[600],
        color : colors.text.secondary,
        marginTop : 2,
        textAlign: 'center'
    },
    removephoto : {position: 'absolute', right: 8, bottom: 8}
})
