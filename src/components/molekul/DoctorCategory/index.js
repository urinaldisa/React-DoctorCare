import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { colors, fonts } from '../../../utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconPsikiater, IconDoctorUmum, IconDoctorAnak,IconObat } from '../../../assets'

const DoctorCategory = ({category,onPress}) => {
    const Gambar = () => {
       if (category === 'dokter umum') {
           return <IconDoctorUmum style={styles.illustration} />
       }
       if (category === 'psikiater') {
        return <IconPsikiater style={styles.illustration}/>
    }
    if (category === 'obat') {
        return <IconObat style={styles.illustration}/>
    }
    if (category === 'anak') {
        return <IconDoctorAnak style={styles.illustration}/>
    }
    if (category === 'dokter bedah') {
        return <IconDoctorAnak style={styles.illustration}/>
    }
}
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
         <Gambar/>
            <Text style={styles.label}>Saya Butuh</Text>
            <Text style={styles.category}>{category}</Text>
            
        </TouchableOpacity>
    )
}

export default DoctorCategory

const styles = StyleSheet.create({
    container : {padding : 12, backgroundColor : colors.cardLight,alignSelf:"flex-start",
    borderRadius :10, marginRight :10,
},
    illustration : {marginBottom : 28},
    label : {fontSize:12, fontFamily: fonts.primary[300], color: colors.text.primary},
    category : {marginBottom : 28},
    label : {fontSize:12, fontFamily: fonts.primary[600], color: colors.text.primary},
})
