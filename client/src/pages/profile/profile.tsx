import React from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import styles from "./profile_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePet from "./componentes/createPet/createPet";
import store from "../../redux/store";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function Profile(props: any) {
    const [pet, setPet] = React.useState<any>(null);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
    const [images, setImages] = React.useState<string[]>([]);
    const [user, setUser] = React.useState<any>(null);

    function handleLogout() {
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        props.loadUserFromStorage()
    }

    React.useEffect(() => {
        getPet()
    }, []);

    async function getPet() {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user')
        setUser(JSON.parse(user))
        const userId = JSON.parse(user).id
        fetch(store.getState().url + '/users/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then(async (data) => {
                if(data.pets.length === 0) return 
                setPet(data.pets[0])
                const promises = data.pets.map(async (pet: any) => {
                    const photoUrls = await Promise.all(pet.photos.map(async (photo: any) => {
                        const storage = getStorage();
                        const storageRef = ref(storage, photo.path);
                        return getDownloadURL(storageRef);
                    }));
    
                    return {
                        id: pet.id,
                        name: pet.name,
                        images: photoUrls
                    };
                });
    
                const petsWithImages = await Promise.all(promises);
                setImages(petsWithImages[0].images)
            })
            .catch((error) => {
                console.error('Error fetching pets:', error);
            })
            .finally(async () => {
                setIsLoaded(true);
            })
       
    }

    if(!isLoaded) {
        return <View style={styles.container}></View>
    }

    return (
        <View style={styles.container}>
            <Text onPress={handleLogout} style={styles.absolute}>Logout</Text>
            <View style={styles.header}>
                <Image style={styles.image} source={{ uri: images[0] ? images[0] : 'https://cdn-icons-png.flaticon.com/512/5987/5987462.png' }} />
            </View>
            <View style={styles.headerContent}>
                <Text style={styles.textHeader}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.textMail}>{user.email}</Text>
                <Text style={styles.textMail}>{user.phone}</Text>
            </View>
            <CreatePet pet={pet ? pet : null} images={images}/>
        </View>
    )
}