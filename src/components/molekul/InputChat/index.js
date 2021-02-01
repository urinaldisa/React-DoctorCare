import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { colors } from '../../../utils/colors'
import { Button} from '../../atom'

const InputChat = ({value, onChangeText,onButtonPress}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} 
            placeholder="Tulis Pesan Untuk Nairobi"
            value={value}
            onChangeText={onChangeText}
            />
            <Button disable={value.length <1} type="btn-icon" onPress={onButtonPress}/>
        </View>
    )
}

export default InputChat

const styles = StyleSheet.create({
    input : {backgroundColor : colors.disable, padding: 14, borderRadius : 10,flex : 1,marginRight: 10},
    container : {flexDirection :'row', padding : 16}
})
