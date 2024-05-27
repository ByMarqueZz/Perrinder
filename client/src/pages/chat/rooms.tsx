import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../redux/store';
import { ChatRoom, Pet, User } from '../../interfaces/interfaces';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Chat from './chat';

export default function Rooms({loadUserFromStorage}: {loadUserFromStorage: () => void}) {
    const [rooms, setRooms] = React.useState<ChatRoom[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [photos, setPhotos] = React.useState<string[]>([]);
    const [pets, setPets] = React.useState<Pet[]>([]);
    const [currentRoom, setCurrentRoom] = React.useState<ChatRoom | null>(null);

    React.useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userParsed = user ? JSON.parse(user) : null;
        if (!userParsed) {
            alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
            return;
        }
        const response = await fetch(`${store.getState().url}/chat/rooms/${userParsed.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            setRooms(data);
            const photos = await Promise.all(data.map(async (room) => {
                if(room.user1.id === userParsed.id) {
                    return fetchingPhotos(room.user2);
                } else {
                    return fetchingPhotos(room.user1);
                }
            }));
            setPhotos(photos);
        } else {
            console.log({status: response.status, response});
            alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
        }
        setLoading(false);
    };

    const fetchingPhotos = async (user: User) => {
        const storage = getStorage();
        const storageRef = ref(storage, user.pets[0].photos[0].path);
        setPets((prevPets) => [...prevPets, user.pets[0]])
        return getDownloadURL(storageRef);
    }

    const handlePress = (room: ChatRoom) => {
        setCurrentRoom(room);
    }

    if(currentRoom) return (
        <Chat room={currentRoom} goBack={()=> {
            setCurrentRoom(null);
        }}/>
    )

    if(loading) return (
        <View style={styles.container}>
            <Text>Cargando...</Text>
        </View>
    )

    if(rooms.length === 0) return (
        <View style={styles.container}>
            <Text style={styles.text}>Parece que aún no has hecho ningún match 😢</Text>
            <Image source={require('../../../assets/lloro.png')} style={{width: 200, height: 200}} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tus matches</Text>
            {
                rooms.map((room, index) => (
                    <TouchableOpacity style={styles.cardRoom} onPress={() => {
                        handlePress(room);
                    }} key={index}>
                        <Image source={{uri: photos[index]}} style={styles.image} />
                        <Text key={room.id} style={styles.text}>{pets[index].name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#f96247',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardRoom: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        width: '90%',
        padding: 10,
        paddingLeft: 20,
        borderBottomWidth: .7,
        borderColor: 'gray',
        borderRadius: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
    }
})