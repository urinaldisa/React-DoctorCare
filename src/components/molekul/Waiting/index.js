import React from 'react'
import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import { colors } from '../../../utils'

const Waiting = () => {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator size="large" color={colors.primary}/>
            <Text>Loading...</Text>
        </View>
    )
}

export default Waiting

const styles = StyleSheet.create({
    wrapper : {
        flex : 1,
        position : 'absolute', 
        justifyContent : 'center', 
        alignItems : 'center',
        backgroundColor : colors.loadingBackground,
        width : '100%',
        height : '100%'
    }
})
