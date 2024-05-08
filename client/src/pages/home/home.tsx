import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, Animated, PanResponder, Dimensions, TouchableWithoutFeedback } from 'react-native';
import styles from './home_styles';
import store from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Pets = [
    { id: "1", name: "Luna", image: 'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg' },
    { id: "2", name: "Max", image: 'https://www.nationalgeographic.com.es/medio/2023/10/25/doberman-1_f3e49bcc_231025192836_800x800.jpg' },
    { id: "3", name: "Coco", image: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/15665/production/_107435678_perro1.jpg' },
    { id: "4", name: "Bella", image: 'https://estaticos-cdn.prensaiberica.es/clip/823f515c-8143-4044-8f13-85ea1ef58f3a_16-9-discover-aspect-ratio_default_0.jpg' },
    { id: "5", name: "Rocky", image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1422023439-64f1eaf518ace.jpg?crop=0.665xw:0.998xh;0.0641xw,0&resize=1200:*' },
];

export default function Home(props: any) {
    const [pets, setPets] = useState<any>(Pets);
    const [imagePets, setImagePets] = useState<any[]>([]);
    const [indice, setIndice] = useState(0);
    const [indicePet, setIndicePet] = useState(0);
    const position = useRef(new Animated.ValueXY()).current;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const [image, setImage] = useState<false | string>(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [panResponder, setPanResponder] = useState(null);

    const rotateCard = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });

    const nextCard = () => {
        setImage(false);
        setPets(prevPets => prevPets.slice(1));
    };

    useEffect(() => {
        if (imagePets.length > 0) {
            setPanResponder(createPanResponder());
        }
    }, [imagePets]);

    useEffect(() => {
        position.setValue({ x: 0, y: 0 });
    }, [pets]);

    useEffect(() => {
        getPets();
    }, []);

    async function getPets() {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(store.getState().url + '/pets', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch pets');
            }

            const data = await response.json();

            const promises = data.map(async (pet: any) => {
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
            setPets(data)
            setImagePets(petsWithImages);
            setIsLoaded(true);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    }
    function createPanResponder() {
        return PanResponder.create({
            onStartShouldSetPanResponder: (event, gesture) => {
                this.startTime = Date.now(); // Registra el tiempo de inicio
                this.startX = gesture.x0; // Registra la posición x de inicio
                return true;
            },
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                this.endTime = Date.now(); // Registra el tiempo de finalización
                this.endX = gesture.x0; // Registra la posición x de finalización

                const duration = this.endTime - this.startTime; // Calcula la duración

                // Swipes
                if (gesture.dx > 120) {
                    // Swipe right
                    Animated.spring(position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
                        useNativeDriver: false,
                    }).start(() => {
                        nextCard();
                    });
                } else if (gesture.dx < -120) {
                    // Swipe left
                    Animated.spring(position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
                        useNativeDriver: false,
                    }).start(() => {
                        nextCard();
                    });
                } else {
                    // Return to initial position
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
                // Clicks
                if (this.endX > 280 && duration < 200) {
                    //Tap right
                    // Calculate the next image
                    setIndicePet(prevIndicePet => {
                        if (prevIndicePet < imagePets[indice].images.length - 1) {
                            return prevIndicePet + 1;
                        } else {
                            return prevIndicePet;
                        }
                    });
                } else if (this.endX < 120 && duration < 200) {
                    //Tap left
                    // Calculate the previous image
                    setIndicePet(prevIndicePet => {
                        if (prevIndicePet > 0) {
                            return prevIndicePet - 1;
                        } else {
                            return prevIndicePet;
                        }
                    });
                }
            },
        })
    }

    if (!isLoaded) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }


    if (pets.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No hay más mascotas</Text>
                <Text onPress={() => {
                    getPets();
                }} style={{
                    color: 'red'
                }}>Reload</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {pets.map((pet, index) => {
                if (index == 0) {
                    return (
                        <Animated.View
                            {...panResponder.panHandlers}
                            key={pet.id}
                            style={[position.getLayout(), styles.card, { transform: [{ rotate: rotateCard }] }]}
                        >
                            {
                                image ?
                                    <Image style={styles.image} source={{ uri: image }} /> :
                                    <Image style={styles.image} source={{ uri: imagePets[index].images[indicePet] }} />
                            }
                            <Text style={styles.name}>{pet.name}</Text>
                        </Animated.View>
                    );

                }
                if (index == 1) {
                    return (
                        <Animated.View
                            key={pet.id}
                            style={[styles.cardAbsolute]}
                        >
                            <Image style={styles.image} source={{ uri: pets[index].image }} />
                            <Text style={styles.name}>{pet.name}</Text>
                        </Animated.View>
                    );
                }
            })}
        </View>
    );
}