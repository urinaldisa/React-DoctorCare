import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconSend } from '../../../assets'
import { colors } from '../../../utils'

const BtnIcon = ({disable,onPress}) => {
    if (disable){
        return(
            <View style={styles.container(disable)}>
              <IconSend />
            </View>
        )
    }
    return (
        <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
          <IconSend />
        </TouchableOpacity>
    )
}

export default BtnIcon

const styles = StyleSheet.create({
    container : (disable) =>(
    { 
        backgroundColor: disable ? colors.disable : '#0066CB',
        width : 45 , 
        height : 45, 
        borderRadius : 10,
        paddingTop : 3, 
        paddingRight : 3, 
        paddingBottom : 8,
        paddingLeft : 8,    
    }) 
})
