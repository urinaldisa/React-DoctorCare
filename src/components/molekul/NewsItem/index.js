import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { dummynews } from '../../../assets'
import { fonts, colors } from '../../../utils'

const NewsItem = ({title, image, date}) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
    <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}> {date}</Text>
            </View>
            <Image source={{uri: image}} style={styles.image}/>
        </View>
    )
}

export default NewsItem

const styles = StyleSheet.create({

    title : {
        fontSize : 16,
    fontFamily : fonts.primary[600],
color : colors.text.primary,},
date : {
    fontSize : 12,
    fontFamily : fonts.primary.normal,
    color : colors.text.secondary,
    marginTop : 4,
},
    container : { paddingHorizontal:16,paddingTop:16,flexDirection : 'row', borderBottomWidth: 1, borderBottomColor: '#EEEEEE', paddingBottom: 12},
    image : {width: 80, height: 60, borderRadius: 11},
    wrapper : {flex : 1}
})
