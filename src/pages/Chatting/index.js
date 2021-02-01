import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import { Header,ChatItem,InputChat } from '../../components'
import {Fire} from '../../config'
import { colors, fonts, getData } from '../../utils'
import { getChatTime, setDateChat } from '../../utils/date'

const Chatting = ({navigation, route}) => {
    const dataDoctor = route.params;
    const [chatContent, setChatContent] = useState("")
    const [user,setUser ] = useState({});
    const [chatData, setChatData] = useState([]);

    useEffect(() => {
        getDataUserFromLocal();
        const chatID = `${user.uid}_${dataDoctor.data.uid}`;
        const urlFirebase = `chatting/${chatID}/allChat/`;
        Fire.database()
          .ref(urlFirebase)
          .on('value', snapshot => {
            if (snapshot.val()) {
              const dataSnapshot = snapshot.val();
              const allDataChat = [];
              Object.keys(dataSnapshot).map(key => {
                const dataChat = dataSnapshot[key];
                const newDataChat = [];
    
                Object.keys(dataChat).map(itemChat => {
                  newDataChat.push({
                    id: itemChat,
                    data: dataChat[itemChat],
                  });
                });
    
                allDataChat.push({
                  id: key,
                  data: newDataChat,
                });
              });
              setChatData(allDataChat);
            }
          });
      }, [dataDoctor.data.uid, user.uid]);
    
      const getDataUserFromLocal = () => {
        getData('user').then(res => {
          setUser(res);
        });
      };
    
      const chatSend = () => {
        const today = new Date();
    
        const data = {
          sendBy: user.uid,
          chatDate: today.getTime(),
          chatTime: getChatTime(today),
          chatContent: chatContent,
        };
        const chatID = `${user.uid}_${dataDoctor.data.uid}`
        const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
        const urlMessageUser = `messages/${user.uid}/${chatID}`
        const urlMessageDoctor =`messages/${dataDoctor.data.uid}/${chatID}`
        const dataHistoryChatForUser = {
            lastContentChat : chatContent,
            lastChatDate : today.getTime(),
            uidPartner : dataDoctor.data.uid,

        };
        const dataHistoryChatForDoctor = {
          lastContentChat : chatContent,
          lastChatDate : today.getTime(),
          uidPartner : user.uid,
        };
       // console.log('data : ',data)
       // console.log('url :', urlFirebase)
        setChatContent('') 
        //Kirim DB 
        Fire.database()
        .ref(
           urlFirebase 
        )
        .push(data)
        .then(()=>{
            setChatContent('');
            Fire.database().ref(urlMessageUser)
            .set(dataHistoryChatForUser)
            //setHistory for doctor
            Fire.database().ref(urlMessageDoctor)
            .set(dataHistoryChatForDoctor)

            
        })
    }

    return (
        <View style={styles.page}>
            <Header 
            type="dark-profile" 
            title={dataDoctor.data.fullName}
            desc={dataDoctor.data.category}
            photo={{uri : dataDoctor.data.photo}}
            onPress={()=>navigation.goBack()}/>
            <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {chatData.map(chat =>{
                    return (
            <View key={chat.id}>
            <Text style={styles.chatDate}>{chat.id}</Text>
            {chat.data.map(itemChat =>{
                const isMe = itemChat.data.sendBy === user.uid;
                return     ( 
                <ChatItem 
                key= {itemChat.id}
                isMe={isMe} 
                text={itemChat.data.chatContent} 
                date={itemChat.data.chatTime}
                photo={isMe ? null : {uri : dataDoctor.data.photo}}
                /> )
            })}

            </View>
                    )
                })}
           
            </ScrollView>
            </View>
            <InputChat 
            value={chatContent}
            onChangeText={(value)=> setChatContent(value)} 
            onButtonPress={chatSend}/>
            
        </View>
    )
}

export default Chatting

const styles = StyleSheet.create({
    page : {flex : 1},
    content : {flex: 1, backgroundColor : 'white'},
    label : { fontSize:11,textAlign: 'center',color :'#7D8797',fontFamily:'Nunito-Reguler'},
    chatDate: {
        fontSize: 11,
        fontFamily : fonts.primary [600],
        color: colors.text.secondary,
        marginVertical: 20,
        textAlign: 'center',
      },
})
