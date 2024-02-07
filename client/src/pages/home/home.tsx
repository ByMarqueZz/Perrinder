import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Animated, PanResponder, Dimensions, Touchable, TouchableWithoutFeedback } from 'react-native';

const Pets = [
    { id: "1", name: "Luna", image: 'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg' },
    { id: "2", name: "Max", image: 'https://www.nationalgeographic.com.es/medio/2023/10/25/doberman-1_f3e49bcc_231025192836_800x800.jpg' },
    { id: "3", name: "Coco", image: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/15665/production/_107435678_perro1.jpg' },
    { id: "4", name: "Bella", image: 'https://estaticos-cdn.prensaiberica.es/clip/823f515c-8143-4044-8f13-85ea1ef58f3a_16-9-discover-aspect-ratio_default_0.jpg' },
    { id: "5", name: "Rocky", image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1422023439-64f1eaf518ace.jpg?crop=0.665xw:0.998xh;0.0641xw,0&resize=1200:*' },
];

export default function Home(props: any) {
    const [pets, setPets] = useState(Pets);
    const position = useRef(new Animated.ValueXY()).current;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const [image, setImage] = useState<false | string>(false);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
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
                    // Return to original position
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start(
                        () => setImage('https://hips.hearstapps.com/hmg-prod/images/gettyimages-695480884-64f8446a4e85d.jpg')
                    );
                    
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

    if (pets.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No hay más mascotas</Text>
                <Text onPress={() => {
                    setPets(Pets);
                }} style={{
                    color: 'red'
                }}>Reload</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {pets.map((pet, index) => {
                if (index === 0) {
                    return (
                        <Animated.View
                            {...panResponder.panHandlers}
                            key={pet.id}
                            style={[position.getLayout(), styles.card, { transform: [{ rotate: rotateCard }] }]}
                        >
                            {
                                image ? <Image style={styles.image} source={{ uri: image }} /> : <Image style={styles.image} source={{ uri: pets[index].image }} />
                            }
                                <Text style={styles.name}>{pet.name}</Text>
                        </Animated.View>

                    );
                }
            })}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: '80%',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    name: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
});
