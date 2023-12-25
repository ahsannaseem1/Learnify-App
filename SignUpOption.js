import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function SignUpOption() {

    const navigation = useNavigation();

    const loginHandle = () => {

        navigation.navigate('Login')
    }
    const studentHandle = () => {

        navigation.navigate('RegisterStudent')
    }
    const teacherHandle = () => {
            
            navigation.navigate('Teacher')
        }



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={teacherHandle}>
                <View >
                    <Text style={styles.text}>As a Teacher</Text>

                </View>

            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={studentHandle}>

                <View >
                    <Text style={styles.text}>As a Student</Text>

                </View>
            </TouchableOpacity>




        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    box: {
        width: '80%',
        height: '6%',
        backgroundColor: '#06161C',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 20,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
