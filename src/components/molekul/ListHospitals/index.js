import React from 'react'
import { StyleSheet, Text, View , Image} from 'react-native'
import { dummyhospitals } from '../../../assets'
import { fonts, colors } from '../../../utils'

const ListHospitals = ({name,city,address,pic}) => {
    return (
        <View style={styles.container}>
            <Image source={pic} style={styles.picture} />
            <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.title}>{city}</Text>
            <Text style={styles.address}>{address}</Text>
            </View>
        </View>
    )
}

export default ListHospitals

const styles = StyleSheet.create({
    container : {flexDirection : 'row',
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#EEEEEE'},
    picture : {marginRight: 16,width : 80, height: 60, borderRadius: 11},
    title : {
        fontSize:16,
        fontFamily : fonts.primary.normal,
        color: colors.text.secondary,
    },
    address : {
        fontSize : 12,
        fontFamily : fonts.primary[300],
        color : colors.text.secondary,
        marginTop: 6
    }
})
