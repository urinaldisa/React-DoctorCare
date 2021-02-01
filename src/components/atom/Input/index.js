import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { colors } from '../../../utils'

const Input = ({label,value,onChangeText,secureTextEntry,disable}) => {
    const [border,setBorder] = useState(colors.border)
    const onFocusForm =() =>{
        setBorder(colors.tertiary)
    }
    const onBlurForm = ()=>{
        setBorder(colors.border)
    }
    return (
        <View>
        <Text style={styles.label}>{label}</Text>
           <TextInput 
           onFocus={onFocusForm}
           onBlur={onBlurForm}
           style={styles.input(border)}
           value={value}
           onChangeText={onChangeText}
           secureTextEntry={secureTextEntry} 
           editable={!disable}
           selectTextOnFocus={!disable}
           />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    input : border => (
        {padding:12,borderWidth: 1, borderColor : border,borderRadius:10}
    ),
    title : {fontSize:20, 
        fontFamily: 'Nunito-SemiBold',
        marginTop:40,
        marginBottom:40,
        maxWidth:153},
    label : { fontSize:16, color :'#7D8797', marginBottom:6,fontFamily:'Nunito-Reguler'},
})
