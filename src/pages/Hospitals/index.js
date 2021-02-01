import React, {useState} from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { bghospitals, dummyhospitals2,dummyhospitals,dummyhospitals3 } from '../../assets'
import { fonts, colors } from '../../utils'
import { ListHospitals } from '../../components'

const Hospitals = () => {
    const [hospitals,setHospitals] = useState([
        {
            id: 1,
            pic : dummyhospitals,
            name : 'Rumah Sakit',
            city : 'Kendal',
            address : 'Jl matoha rt 02 rw 04 ',
        },
        {
            id: 2,
            pic : dummyhospitals2,
            name : 'Rumah Sakit',
            city : 'Sucipto Semarang',
            address : 'Jl Kyai saleh ',
        },
        {
            id: 3,
            pic : dummyhospitals3,
            name : 'Rumah Sakit',
            city : 'Islam Weleri',
            address : 'Jl Patimura no 37',
        },
    ])
    return (
        <View style={styles.page}>
            <ImageBackground source={bghospitals} style={styles.background}> 
            <Text style={styles.title}>Nearby Hospitals</Text> 
            <Text style={styles.desc}>3 Tersedia </Text>
            </ImageBackground>
            <View style={styles.content}>
            {
                hospitals.map(hospital => {
                    return <ListHospitals
                    key = {hospital.id}
                    pic = {hospital.pic}
                    name = {hospital.name}
                    city = {hospital.city}
                    address = {hospital.address}
                    />
                })
            }
            
            </View>
            
        </View>
    )
}
export default Hospitals

const styles = StyleSheet.create({
    page : {backgroundColor : colors.secondary, flex: 1},
    content : {backgroundColor : colors.white,borderRadius : 20, flex: 1,marginTop: -30 },
    background : {height: 240,paddingTop: 30},
    title : { fontSize : 20, fontFamily : fonts.primary[600],color: colors.white, textAlign: 'center'},
    desc : {fontSize: 14, fontFamily: fonts.primary[300],color : colors.white, marginTop: 6, textAlign:'center',}
})