import React from "react";
import { View, Text, TextInput, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import styles from "./createpet_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "../../../../redux/store";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function CreatePet(props: any) {
    // imagen
    const [images, setImages] = React.useState<string[]>([]);
    // formulario
    const [name, setName] = React.useState<string>(props.pet ? props.pet.name : '');
    const [gender, setGender] = React.useState<string>('');
    const [breed, setBreed] = React.useState<string>('');
    const [weight, setWeight] = React.useState<string>('');
    const [age, setAge] = React.useState<string>('');
    const [location, setLocation] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>(props.pet ? props.pet.description : '');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.images) {
            setImages(props.images)
        }
    }, []);

    async function selectImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageBlob = await urlToBlob(result.assets[0].uri);
            setImages([...images, result.assets[0].uri]);
        }
    };

    async function urlToBlob(uri) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new Error('Failed to convert URL to Blob'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    }

    async function uploadToFirebase(blob) {

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + Date.now());

        try {
            const snapshot = await uploadBytes(storageRef, blob);
            return snapshot.metadata.fullPath;
            // Aquí puedes hacer lo que necesites con la URL de descarga
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user')
        const userId = JSON.parse(user).id
        const uploadTasks = images.map(async (image) => {
            const imageBlob = await urlToBlob(image);
            return uploadToFirebase(imageBlob);
        });
        const array = await Promise.all(uploadTasks);
        if (props.pet) {
            updatePet(token, userId, array)
            .then(() => {
                setName('')
                alert('Mascota actualizada correctamente')
                setIsLoading(false)
            })
        } else {
            createPet(token, userId, array).then(() => {
                setName('')
                alert('Mascota creada correctamente')
                setIsLoading(false)
            })
        }
        
    }

    async function createPet(token, userId, array) {
        return await fetch(store.getState().url + '/pets/' + userId, {
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
                photos: array
            })
        })
    }

    async function updatePet(token, userId, array) {
        await fetch(store.getState().url + '/pets/' + props.pet.id, {
            method: 'PATCH',
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
                photos: array
            })
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

    if(isLoading) {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
            <Text>Guardando...</Text>
        </View>
    }
    return (
        <>
            <View style={styles.container}>
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

                    <TextInput style={styles.input} placeholder={props.pet ? props.pet.name : 'Nombre'} onChange={(e) => {
                        setName(e.nativeEvent.text)
                    }} />
                    <TextInput style={styles.inputDescripcion} onChange={(e) => {
                        setDescription(e.nativeEvent.text)
                    }}
                        numberOfLines={3}
                        placeholder={props.pet ? props.pet.description : 'Descripción (Como es tu perro, edad, género...'} />
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
                </View>
            </View>
        </>
    )
}