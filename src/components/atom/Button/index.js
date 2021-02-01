import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import IconOnly from './IconOnly'
import BtnIcon from './BtnIcon'
import { colors } from '../../../utils'


const Button = ({type, title, onPress,icon,disable}) => {
    if(type === 'btn-icon'){
        return(
            <BtnIcon disable={disable} onPress={onPress}/>
        ) 
    }
    if(type === 'icon-only'){
        return (
            <IconOnly icon={icon} onPress={onPress}/>)
    }
    if(disable){
        return (
            <View style={styles.disableBg}>
                <Text style={styles.disableText}>{title}</Text>
            </View>
        )
    }
    return (
        <TouchableOpacity style={styles.container(type)} onPress={onPress}>
            <Text style={styles.text(type)}>{title}</Text>
        </TouchableOpacity>
    )  
}

export default Button

const styles = StyleSheet.create({
    container :(type) => ( {
        backgroundColor: type == 'secondary' ? 'white' : '#0BCAD4',
        paddingVertical:10,
        borderRadius:10
    }),
    disableBg : {
        paddingVertical : 10,
        borderRadius : 10, 
        backgroundColor : colors.button.disable.background,
    },
    disableText : {fontSize: 16, fontWeight:'600', textAlign:'center',color: colors.button.disable.text},
        text : (type) => ({
            fontSize: 16,
            fontWeight:'600',
            textAlign:'center',
            color:type== 'secondary'?'#112340' :'white'}),
})