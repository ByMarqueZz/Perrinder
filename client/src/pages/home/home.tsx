import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, Animated, PanResponder, Dimensions, TouchableWithoutFeedback } from 'react-native';
import styles from './home_styles';
import store from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pets = [
    { id: "1", name: "Luna", image: 'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg' },
    { id: "2", name: "Max", image: 'https://www.nationalgeographic.com.es/medio/2023/10/25/doberman-1_f3e49bcc_231025192836_800x800.jpg' },
    { id: "3", name: "Coco", image: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/15665/production/_107435678_perro1.jpg' },
    { id: "4", name: "Bella", image: 'https://estaticos-cdn.prensaiberica.es/clip/823f515c-8143-4044-8f13-85ea1ef58f3a_16-9-discover-aspect-ratio_default_0.jpg' },
    { id: "5", name: "Rocky", image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1422023439-64f1eaf518ace.jpg?crop=0.665xw:0.998xh;0.0641xw,0&resize=1200:*' },
];

export default function Home(props: any) {
    const [pets, setPets] = useState<any>(Pets);
    const position = useRef(new Animated.ValueXY()).current;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const [image, setImage] = useState<false | string>(false);

    const panResponder = useRef(
        PanResponder.create({
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
                    setImage("https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQOO0X7mMnoYz-e9Zdc6Pe6Wz7Ow1DcvhEiaex5aSv6QJDoCtcooqA7UUbjrphvjlIc");
                } else if (this.endX < 120 && duration < 200) {
                    //Tap left
                    setImage(pets[0].image);
                }
            },
        })
    ).current;


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
        position.setValue({ x: 0, y: 0 });
    }, [pets]);

    useEffect(() => {
        getPets();
    }, []);

    async function getPets() {
        const token = await AsyncStorage.getItem('token')
        fetch(store.getState().url + '/pets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                return response.json();
            })
            .then(async data => {
                console.log(data);
                const petsWithBlobs = await Promise.all(data.map(async (pet: any) => {
                    const photosPromises = pet.photos.map(async (photo: any) => {
                        const blob = bufferToBlob(photo.file.data.data, photo.file.type);
                        return { ...photo, blob };
                    });
                    const photos = await Promise.all(photosPromises);
                    return { ...pet, photos };
                }));
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    function bufferToBlob(buffer: any, type: string) {
        return new Blob([buffer], { type: type });
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
                                    <Image style={styles.image} source={{ uri: pets[index].image }} />
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