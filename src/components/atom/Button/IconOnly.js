import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBackDark } from '../../../assets'

const IconOnly = ({onPress, icon}) => {
    const Icon =()=>{
        if(icon === 'dark-back'){
            return <IconBackDark />
        }
        if(icon === 'dark-light'){
            return <IconBackLight />
        }
        return <IconBackDark />
    };

    return (
        <TouchableOpacity onPress={onPress}>
           <Icon />
        </TouchableOpacity>
            
    )
}

export default IconOnly

const styles = StyleSheet.create({})
