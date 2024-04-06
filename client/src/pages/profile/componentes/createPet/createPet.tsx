import React from "react";
import { View, Text, TextInput, Image, TouchableWithoutFeedback } from "react-native";
import styles from "./createpet_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "../../../../redux/store";
import * as ImagePicker from 'expo-image-picker';
import Autocomplete from 'react-native-autocomplete-input';

export default function CreatePet(props: any) {
    // imagen
    const [images, setImages] = React.useState<string[]>([]);
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

    // React.useEffect(() => {
    //     getTokenPetFinder()
    // }, [])


    // /**
    //  * Función para obtener las razas que hay
    //  */
    // function getTokenPetFinder() {
    //     fetch('https://api.petfinder.com/v2/oauth2/token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             grant_type: 'client_credentials',
    //             client_id: 'TcwSrYYl9VhFboIlvAPpOcTw2s73FZs0kzVODJar1VytGL3W7R',
    //             client_secret: 'Dsa1bacREBHc6uCfPVNMdgPgjySiyCj54bRzTrc4'
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             let token = data.access_token
    //             fetch('https://api.petfinder.com/v2/types/dog/breeds', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     "Authorization": "Bearer " + token,
    //                 },
    //             })
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     setBreeds(data.breeds.map((breed: any) => breed.name))
    //                 })
    //         })
    // }

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


        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
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
                user: userId,
                photos: images
            })
        })
            .then(response => response.json())
            .then(data => {
                props.goBack()
                alert('Perro creado correctamente')
            })
    }

    /**
     * Borra la última foto del array de imágenes
     */
    function handleDeleteImg() {
        let newImages = images
        newImages.pop()
        setImages([...newImages])
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', fontSize: 30, marginTop: 60 }}>Crea tu mascota</Text>
                {/* Bucle para las fotos */}
                <View style={styles.containerImgs}>
                    {
                        [0, 1, 2, 3, 4, 5, 6, 7].map((index, key) => {
                            return <TouchableWithoutFeedback onPress={() => {
                                selectImage()
                            }} key={key}>
                                {
                                    images[index] === undefined ?
                                        <Image source={require('../../../../../assets/add.png')} style={styles.imgs} /> :
                                        <View style={styles.viewImg}>
                                            <Image source={{ uri: images[index] }} style={styles.imgs} />
                                        </View>

                                }
                            </TouchableWithoutFeedback>
                        })
                    }
                    <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 10, color: 'red' }} onPress={handleDeleteImg}>Borrar última foto</Text>
                </View>
                <View style={styles.containerDiv}>

                    <TextInput style={styles.input} placeholder="Nombre" onChange={(e) => {
                        setName(e.nativeEvent.text)
                    }} />
                    <TextInput style={styles.inputDescripcion} onChange={(e) => {
                        setDescription(e.nativeEvent.text)
                    }} multiline = {true}
                    numberOfLines = {4}
                    placeholder={`Descripción\n(De donde eres, como es tu perro,\nedad, género...)`}/>
                    {/* <TextInput style={styles.input} placeholder="Género (M o F)" value={gender} onChange={(e) => {
                        if(e.nativeEvent.text === 'M' || e.nativeEvent.text === 'F') {
                            setGender(e.nativeEvent.text)
                        } else {
                            alert('El género debe ser M o F')
                        }
                    }} /> */}
                    {/* <Autocomplete
                        data={breeds}
                        value={currentTextBreed}
                        style={styles.autocomplete}
                        placeholder="Raza"
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
                    /> */}
                    {/* <TextInput style={styles.input} placeholder="Peso" onChange={(e) => {
                        setWeight(e.nativeEvent.text)
                    }} />
                    <TextInput style={styles.input} placeholder="Edad" onChange={(e) => {
                        setAge(e.nativeEvent.text)
                    }} />
                    <TextInput style={styles.input} placeholder="Localidad" onChange={(e) => {
                        setLocation(e.nativeEvent.text)
                    }} /> */}
                    

                </View>
                <View style={styles.container_buttons}>
                    <Text onPress={handleSubmit} style={{ color: 'blue' }}>Guardar perro</Text>
                    <Text onPress={props.goBack} style={{ color: 'red' }}>Cancelar</Text>
                </View>
            </View>
        </>
    )
}