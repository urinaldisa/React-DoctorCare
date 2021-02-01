import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, ListDoctor } from '../../components'
import { dokter1,dokter3 } from '../../assets'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Fire } from '../../config'
import Doctor from '../Doctor'

const ChooseDoctor = ({navigation, route}) => {
    const [listDoctor, setListDoctor] =useState ([]);
    const itemCategory = route.params;
    useEffect(()=>{
        callDoctorByCategory(itemCategory.category)
    }, []);

    const callDoctorByCategory = category=>{
        Fire.database()
        .ref('doctors/')
        .orderByChild('category')
        .equalTo(category)
        .once('value')
        .then(res =>{
            console.log('data list :',res.val());
            if(res.val()){
                const oldData = res.val();
                const data = []
                Object.keys(oldData).map(item =>{
                    data.push({
                        id : item,
                        data: oldData[item],
                    })
                })
                setListDoctor(data);
            }
           
        })
    }
    return (
        <View>
            <Header 
            title={`Pilih ${itemCategory.category}`} 
            onPress={() => navigation.goBack()}/>
            {listDoctor.map(doctor =>{
                return (
<ListDoctor 
            type={'next'} 
            profile={{uri : doctor.data.photo}} 
            name={doctor.data.fullName} 
            desc={doctor.data.gender} 
            onPress={()=> navigation.navigate('DoctorProfile', doctor)}/>
                )
            })}
            
            <ListDoctor type={'next'} profile={dokter3} name={"Peter Parker"} desc={"Nggeh leres"} onPress={()=> navigation.navigate('Chatting')}/>
        </View>
    )
}

export default ChooseDoctor

const styles = StyleSheet.create({})
  