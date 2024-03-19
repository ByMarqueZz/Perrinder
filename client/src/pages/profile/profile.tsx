import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./profile_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "../../redux/store";

export default function Profile(props:any) {
    const [name, setName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [breed, setBreed] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [age, setAge] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleLogout() {
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        props.loadUserFromStorage()
    }

    async function handleSubmit() {
        // cogemos token y usuario del storage
        const token = await AsyncStorage.getItem('token')
        const user = await AsyncStorage.getItem('user')
        const userId = JSON.parse(user).id

        fetch(store.getState().url + '/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: name,
                gender: gender,
                breed: breed,
                weight: weight,
                age: age,
                location: location,
                description: description,
                user: userId
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
    }
    return (
        <View style={styles.container}>
            <Text>Añade mascota</Text>
            <TextInput style={styles.input} placeholder="Nombre" onChange={(e) => {
                setName(e.nativeEvent.text)
            }}/>
            <TextInput style={styles.input} placeholder="Genero" onChange={(e) => {
                setGender(e.nativeEvent.text)
            }}/>
            <TextInput style={styles.input} placeholder="Raza" onChange={(e) => {
                setBreed(e.nativeEvent.text)
            }}/>
            <TextInput style={styles.input} placeholder="Peso" onChange={(e) => {
                setWeight(e.nativeEvent.text)
            }}/>
            <TextInput style={styles.input} placeholder="Edad" onChange={(e) => {
                setAge(e.nativeEvent.text)
            }}/>
            <TextInput style={styles.input} placeholder="Localidad" onChange={(e) => {
                setLocation(e.nativeEvent.text)
            }}/>
            <TextInput style={styles.input} placeholder="Descripción" onChange={(e) => {
                setDescription(e.nativeEvent.text)
            }}/>
            <Text onPress={handleSubmit} style={{color:'blue'}}>Guardar perro</Text>
            <Text onPress={handleLogout} style={{color:'red'}}>Logout</Text>
        </View>
    )
}