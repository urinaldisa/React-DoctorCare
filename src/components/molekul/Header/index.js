import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors,fonts } from '../../../utils'
import {Button, Gap} from '../../atom'
import DarkProfile from './DarkProfile'
const Header = ({onPress,title,desc, photo, type}) => {
    if (type === 'dark-profile'){
        return <DarkProfile onPress={onPress} title={title} desc={desc} photo={photo}/>
    }
    return (
        <View style={styles.container}>
            {/*<IconBackDark />*/}
            <Button 
            type="icon-only" 
            icon={type === 'dark' ? 'back-light': 'back-dark'} 
            onPress={onPress}/>
            <Text style={styles.text}>{title}</Text>
           <Gap width={24}/>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container :{
        paddingHorizontal: 16,
        paddingVertical:30,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems:'center',
    },
    text: {
        textAlign:'center',
        flex:1,fontSize:20,
        fontFamily:'Nunito-SemiBold',
        color: colors.text.primary}
})
