import { StatusBar } from 'expo-status-bar';
import React, { cloneElement, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

export default function Profile() {
    const [isChecked, setChecked] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    

    const img1 = require('./images/Ahsan.jpg');
    var description = [
        { id: 0, title: 'Years of Exp.', information: '5 Years' },
        { id: 1, title: 'University', information: 'COMSATS' },
        { id: 2, title: 'Teaching to', information: '1-5 Std' },

    ]
    var duration = [
        { id: 0, time: '10 Days' },
        { id: 1, time: '20 Days' },
        { id: 2, time: '30 Days' },
        { id: 3, time: '60 Days' },

    ]
    const navigation = useNavigation();

    const homeHandle = () => {

        navigation.navigate('Home')
    }
    return (
        <View style={{ flex: 1, backgroundColor:'#06161C' }}>
            <View style={{ flex: 0.10, alignItems: 'center', flexDirection: 'row', marginTop: 30, backgroundColor: '#06161C', }}>
                <FontAwesome name="angle-left" size={30} style={{ color: 'white', marginLeft: 15 }} />
                <View style={{ flex: 1, alignItems: 'center', marginRight: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tutor's Profile</Text>
                </View>
            </View>

            <View style={{ flex: 0.90, borderStartStartRadius: 50, borderStartEndRadius: 50, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                    <View style={{ marginTop: 30 }}>
                        <Image
                            style={{ width: 80, height: 80, borderRadius: 50 }}
                            source={img1}>
                        </Image>
                    </View>
                    <View style={{ marginTop: 40, marginLeft: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ahsan Nseem</Text>
                        <Text style={{ fontSize: 15, color: '#6b6969', marginTop: 5 }}>Software Engineer</Text>
                    </View>
                </View>

                <View style={{ height: '10%', marginTop: 20 }}>

                    <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={description}
                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity style={styles.tapbutton}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12 }}> {item.title} </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 5 }}>{item.information}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                        }
                        keyExtractor={item => item.id}
                    />
                </View>


                <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 0.42, borderWidth: 1, width: '80%', padding: 15, borderRadius: 10, }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Subject</Text>
                            <Text style={{ fontWeight: 'bold' }}>Per Class</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', height: '20%', justifyContent: 'space-between', flexDirection: 'row', padding: 10, marginTop: 10 }} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Checkbox value={isChecked} onValueChange={setChecked} style={{ borderRadius: 10 }} />
                                <Text style={{ marginLeft: 5 }}>Computer</Text>
                            </View>
                            <Text>$20</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', height: '20%', justifyContent: 'space-between', flexDirection: 'row', padding: 10 }} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Checkbox value={isChecked} onValueChange={setChecked} style={{ borderRadius: 10 }} />
                                <Text style={{ marginLeft: 5 }}>Mathematics</Text>
                            </View>
                            <Text>$15</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', height: '20%', justifyContent: 'space-between', flexDirection: 'row', padding: 10 }} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Checkbox value={isChecked} onValueChange={setChecked} style={{ borderRadius: 10 }} />
                                <Text style={{ marginLeft: 5 }}>English</Text>
                            </View>
                            <Text>$11</Text>
                        </View>
                    </View>




                    {/* <View style={{ flex: 0.42, borderWidth: 1, width: '80%', height: '50%', padding: 15, borderRadius: 10, marginTop: 20 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Combined Pack</Text>
                            <Text style={{ fontWeight: 'bold' }}>Per Month</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', height: '20%', justifyContent: 'space-between', flexDirection: 'row', padding: 10, marginTop: 10 }} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Checkbox value={isChecked} onValueChange={setChecked} style={{ borderRadius: 10 }} />
                                <Text style={{ marginLeft: 5 }}>Computer</Text>
                            </View>
                            <Text>$200</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', height: '20%', justifyContent: 'space-between', flexDirection: 'row', padding: 10 }} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Checkbox value={isChecked} onValueChange={setChecked} style={{ borderRadius: 10 }} />
                                <Text style={{ marginLeft: 5 }}>Mathematics</Text>
                            </View>
                            <Text>$150</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', height: '20%', justifyContent: 'space-between', flexDirection: 'row', padding: 10 }} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Checkbox value={isChecked} onValueChange={setChecked} style={{ borderRadius: 10 }} />
                                <Text style={{ marginLeft: 5 }}>English</Text>
                            </View>
                            <Text>$110</Text>
                        </View>
                    </View> */}
                </View>

                <View style={{ flex: 0.2, height: '10%' }}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: 15 }}>Select Duration</Text>
                    <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={duration}
                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity style={{
                                padding: 5, marginTop: 10, height: '40%', width: 120, borderRadius: 20, marginRight: 5,
                                marginLeft: 15, alignItems: 'center', justifyContent: 'center', borderWidth: selectedDay === item.id ? 0:1, backgroundColor: selectedDay === item.id ? '#e01f50' : 'white',
                            }}
                                onPress={() => setSelectedDay(item.id)}>
                                <View>
                                    <Text style={{ color: selectedDay === item.id ? '#edebe8' : '#06161C' }}> {item.time} </Text>
                                </View>
                            </TouchableOpacity>
                        )
                        }
                        keyExtractor={item => item.id}
                    />

                </View>


            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, tapbutton: {
        flexDirection: 'row',
        height: '100%',
        width: 120,
        padding: 15,
        marginRight: 5,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1
    }
});
