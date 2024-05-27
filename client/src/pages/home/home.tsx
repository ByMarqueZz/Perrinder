import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, Animated, PanResponder, Dimensions, TouchableWithoutFeedback } from 'react-native';
import styles from './home_styles';
import store from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import ConfettiCannon from 'react-native-confetti-cannon';

export default function Home(props: any) {
    const [pets, setPets] = useState<any>([]);
    const [imagePets, setImagePets] = useState<any[]>([]);
    const [indice, setIndice] = useState(0);
    const [indicePet, setIndicePet] = useState(0);
    const position = useRef(new Animated.ValueXY()).current;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const [image, setImage] = useState<false | string>(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [panResponder, setPanResponder] = useState(null);
    const [likeTextPosition, setLikeTextPosition] = useState({ x: 0, y: 0 });
    const [isMatch, setIsMatch] = useState(false);
    const [petMatched, setPetMatched] = useState(null);

    const rotateCard = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });

    const nextCard = () => {
        setImage(false);
        setLikeTextPosition({ x: 0, y: 0 });
        // elimina el primer elemento del array
        setPets(prevPets => prevPets.slice(1));
        setImagePets(prevImagePets => prevImagePets.slice(1));
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
        getPets()
            .finally(() => {
                setIsLoaded(true);
            });
    }, []);

    async function getPets() {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userParsed = user ? JSON.parse(user) : null;
        const response = await fetch(store.getState().url + '/pets/' + userParsed.id.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            props.loadUserFromStorage();
            throw new Error('Failed to fetch pets');
        }

        const data = await response.json();

        const promises = data.map(async (pet: any) => {
            const photoUrls = await Promise.all(pet.photos.map(async (photo: any) => {
                // firebase storage
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
        if (data.length !== 0 && petsWithImages.length !== 0) {
            setPets(data)
            setImagePets(petsWithImages);
        }

    }

    async function likePet(pet) {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userParsed = user ? JSON.parse(user) : null;
        if (!userParsed) {
            alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
            return;
        }
        const response = await fetch(store.getState().url + '/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                user1Id: userParsed.id,
                user2Id: pet.user.id
            })
        })
        const data = await response.json();
        if (data.haslike) {
            setPetMatched(pet);
            setIsMatch(true);
            await createRoom(userParsed.id, pet.user.id);
            setTimeout(() => {
                setIsMatch(false);
                setPetMatched(null);
            }, 4500);
        }
    }

    async function createRoom(user1Id: number, user2Id: number) {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(store.getState().url + '/chat/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                user1Id: user1Id,
                user2Id: user2Id
            })
        });
        const data = await response.json();
        console.log(data);
    }

    async function dislikePet(petId: number) {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userParsed = user ? JSON.parse(user) : null;
        if (!userParsed) {
            alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
            return;
        }
        const response = await fetch(store.getState().url + '/dislike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                user1Id: userParsed.id,
                user2Id: petId
            })
        })
        const data = await response.json();
        console.log(data)
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
                setLikeTextPosition({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                this.endTime = Date.now(); // Registra el tiempo de finalización
                this.endX = gesture.x0; // Registra la posición x de finalización

                const duration = this.endTime - this.startTime; // Calcula la duración

                // Swipes
                if (gesture.dx > 120) {
                    // Swipe right and like
                    Animated.spring(position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
                        useNativeDriver: false,
                    }).start(async () => {
                        await likePet(pets[0]);
                        nextCard();
                    });
                } else if (gesture.dx < -120) {
                    // Swipe left and dislike
                    Animated.spring(position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
                        useNativeDriver: false,
                    }).start(async () => {
                        await dislikePet(pets[0].user.id);
                        nextCard();
                    });
                } else {
                    // Return to initial position
                    setLikeTextPosition({ x: 0, y: 0 });
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
            </View>
        );
    }

    if (isMatch) {
        return (
            <View style={styles.match}>
                <ConfettiCannon
                    count={150} // Número de piezas de confeti
                    origin={{ x: -10, y: 0 }} // Origen del confeti (parte superior izquierda)
                    autoStart={true}
                    fadeOut={true}
                    explosionSpeed={300} // Velocidad de la explosión
                />
                <Text style={styles.textMatch}>¡Match!</Text>
                <Image style={styles.matchImage} source={{ uri: imagePets[indice].images[indicePet] }} />
                <Text>¡Enhorabuena!, acabas de hacer match con {petMatched.name}</Text>
            </View>
        );
    }

    if (pets.length === 0) {
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/nodog.png')} />
                <Text>¡Vaya...!</Text>
                <Text>Parece que ya has visto todas las mascotas</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {pets.map((pet, index) => {
                if (index == 0) {
                    return (
                        <Animated.View
                            {...(panResponder && panResponder.panHandlers)}
                            key={pet.id}
                            style={[position.getLayout(), styles.card, { transform: [{ rotate: rotateCard }] }]}
                        >
                            {
                                // Like and dislike text
                                likeTextPosition.x > 0 ? <View style={[styles.likeTextView]}>
                                    <Text style={styles.likeText}>LIKE</Text>
                                </View> : null
                            }
                            {
                                likeTextPosition.x < 0 ? <View style={[styles.dislikeTextView]}>

                                    <Text style={styles.dislikeText}>DISLIKE</Text>
                                </View> : null
                            }
                            {
                                // photo index
                                imagePets[index].images.length > 1 ? <View style={styles.photoIndex}>
                                    {
                                        imagePets[index].images.map((image, index) => {
                                            return <Text key={index} style={[styles.photoIndexText, { color: indicePet == index ? 'black' : 'grey' }]}>______</Text>
                                        })
                                    }
                                </View> : null
                            }
                            {
                                image ?
                                    <Image style={styles.image} source={{ uri: image }} /> :
                                    <Image style={styles.image} source={{ uri: imagePets[index].images[indicePet] }} />
                            }
                            <Text style={styles.name}>{pet.name}</Text>
                            <Text style={styles.description}>{pet.description}</Text>
                        </Animated.View>
                    );

                }
                if (index == 1) {
                    return (
                        <Animated.View
                            key={pet.id}
                            style={[styles.cardAbsolute]}
                        >
                            <Image style={styles.image} source={{ uri: imagePets[index].images[indicePet] }} />
                            <Text style={styles.name}>{pet.name}</Text>
                            <Text style={styles.description}>{pet.description}</Text>
                        </Animated.View>
                    );
                }
            })}
        </View>
    );

}