import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import { dokter2,IconDescProfile,IconEditProfile,IconRate,IconTranslate,Next } from '../../../assets'
import { fonts, colors } from '../../../utils'

const ListDoctor = ({profile, name , desc, type,onPress,icon}) => {
    const Icon = () => {
        if(icon === 'edit-profile'){
            return <IconEditProfile />
        }
        if(icon === 'translate'){
            return <IconTranslate />
        }
        if(icon === 'rate-profile'){
            return <IconRate />
        }
        if(icon === 'desc-profile'){
            return <IconDescProfile />
        }

    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon ? <Icon /> :  <Image source={profile} style={styles.avatar}/>}
           
            <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>{desc}</Text>
            </View>
           {
               type === 'next' && <Next />
           }
        </TouchableOpacity>
    )
}

export default ListDoctor

const styles = StyleSheet.create({
    container : {justifyContent: 'space-between',alignItems: 'center',borderBottomWidth: 1,borderBottomColor: '#EEEEEE',flexDirection: 'row', padding: 16},
    avatar : {width : 46, height : 46, borderRadius: 46/2},
    name : {
        fontSize : 16,
        fontFamily : fonts.primary.normal,
        color : colors.text.primary,
    },
    content : {
        flex :1,
        marginLeft :16
    },
    desc : {
        fontSize : 12,
        fontFamily : fonts.primary[300],
        color : colors.text.secondary,
    }
})
