import React from "react";
import { View, Text, TextInput, Image } from "react-native";
import styles from "./createpet_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "../../../../redux/store";
import * as ImagePicker from 'expo-image-picker';
import Autocomplete from 'react-native-autocomplete-input';

export default function CreatePet(props: any) {
    // imagen
    const [image, setImage] = React.useState(null);
    // formulario
    const [name, setName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [breed, setBreed] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [age, setAge] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [breeds, setBreeds] = React.useState<string[]>([]);
    const [currentTextBreed, setCurrentTextBreed] = React.useState<string>('');

    React.useEffect(() => {
        getTokenPetFinder()
       AsyncStorage.getItem('token').then((token) => {
            console.log(token)
       })
    }, [])



    function getTokenPetFinder() {
        fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: 'TcwSrYYl9VhFboIlvAPpOcTw2s73FZs0kzVODJar1VytGL3W7R',
                client_secret: 'Dsa1bacREBHc6uCfPVNMdgPgjySiyCj54bRzTrc4'
            })
        })
            .then(response => response.json())
            .then(data => {
                let token = data.access_token
                fetch('https://api.petfinder.com/v2/types/dog/breeds', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + token,
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        setBreeds(data.breeds.map((breed: any) => breed.name))
                    })
            })
    }

    /**
     * Función para seleccionar una imagen de la galería
     */
    async function selectImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

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
        <>
            <View style={styles.container}>
                {/* <TouchableWithoutFeedback onPress={props.goBack}>
                    <Image source={require("../../../../../assets/izquierda.png")} style={styles.image} />
                </TouchableWithoutFeedback> */}
                <Image source={require('../../../../../assets/backgroundCreatePet.jpg')} style={styles.backgrounImageHeader} />
                <View style={styles.containerDiv}>
                    <TextInput style={styles.input} placeholder="Nombre" onChange={(e) => {
                        setName(e.nativeEvent.text)
                    }} />
                    <TextInput style={styles.input} placeholder="Genero" onChange={(e) => {
                        setGender(e.nativeEvent.text)
                    }} />
                    <Autocomplete
                        data={breeds}
                        value={currentTextBreed}
                        style={styles.autocomplete}
                        onChangeText={(text) => setCurrentTextBreed(text)}
                        flatListProps={{
                            keyExtractor: (_, idx) => idx.toString(),
                            renderItem: ({ item }) => {
                                if (currentTextBreed.length > 0 && item.toLowerCase().includes(currentTextBreed.toLowerCase()) && item !== currentTextBreed)
                                    return <Text onPress={() => {
                                        setCurrentTextBreed(item)
                                    }}>{item}</Text>
                                else
                                    return <></>
                            },
                        }}
                    />
                    <TextInput style={styles.input} placeholder="Peso" onChange={(e) => {
                        setWeight(e.nativeEvent.text)
                    }} />
                    <TextInput style={styles.input} placeholder="Edad" onChange={(e) => {
                        setAge(e.nativeEvent.text)
                    }} />
                    <TextInput style={styles.input} placeholder="Localidad" onChange={(e) => {
                        setLocation(e.nativeEvent.text)
                    }} />
                    <TextInput style={styles.input} placeholder="Descripción" onChange={(e) => {
                        setDescription(e.nativeEvent.text)
                    }} />

                </View>
                <View style={styles.container_buttons}>
                    <Text onPress={handleSubmit} style={{ color: 'blue' }}>Guardar perro</Text>
                    <Text onPress={props.goBack} style={{ color: 'red' }}>Cancelar</Text>
                </View>
            </View>
        </>
    )
}