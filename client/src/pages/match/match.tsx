import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./match_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "../../redux/store";
import { Like, LikesResponse } from "../../interfaces/interfaces";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function Match() {
    const [mislikesWithImages, setMislikesWithImages] = React.useState<Like[]>([]);
    const [loslikequemedanWithImages, setLoslikequemedanWithImages] = React.useState<Like[]>([]);
    const [showMislikes, setShowMislikes] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userParsed = user ? JSON.parse(user) : null;
        if (!userParsed) {
            alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
            return;
        }
        const response = await fetch(`${store.getState().url}/likes/all/${userParsed.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const data: LikesResponse = await response.json();
            const mislikesWithImages = await getLikesWithImages(data.mislikes);
            const loslikequemedanWithImages = await getLikesWithImages(data.losqlikequemedan);
            setMislikesWithImages(mislikesWithImages);
            setLoslikequemedanWithImages(loslikequemedanWithImages);
            setLoading(false);
        } else {
            alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
        }
    };

    const getLikesWithImages = async (likes: Like[]) => {
        const promises = likes.map(async (like) => {
            const petImages = await Promise.all(like.user.pets.map(async (pet) => {
                const photoUrls = await Promise.all(pet.photos.map(async (photo) => {
                    const storage = getStorage();
                    const storageRef = ref(storage, photo.path);
                    return getDownloadURL(storageRef);
                }));
                return { ...pet, photoUrls };
            }));

            const userWithPetsImages = {
                ...like,
                user: {
                    ...like.user,
                    pets: petImages
                }
            };

            return userWithPetsImages;
        });

        return Promise.all(promises);
    };

    const isMatch = (userId: number) => {
        return mislikesWithImages.some(like => like.user.id === userId) && loslikequemedanWithImages.some(like => like.user.id === userId);
    };

    if (loading) {
        return (
            <View style={styles.container}>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.switch}>
                <View style={showMislikes ? styles.itsTrue : null}>
                    <Text style={showMislikes ? styles.switchText : styles.title} onPress={() => {
                        setShowMislikes(true);
                    }}>Mis likes</Text>
                </View>
                <View style={!showMislikes ? styles.itsTrue : null}>
                    <Text style={!showMislikes ? styles.switchText : styles.title} onPress={() => {
                        setShowMislikes(false);
                    }}>Recibidos</Text>
                </View>
            </View>
            {
                showMislikes ? (
                    <View style={styles.mislikescontainer}>
                        {mislikesWithImages.length === 0 ? <View style={styles.noLike}><Text>No has dado ningún like todavía</Text></View> : null}
                        {mislikesWithImages.map((like, index) => (
                            <View key={index} style={styles.cardlist}>
                                {like.user.pets.map((pet) => (
                                    <View style={styles.card} key={pet.id}>
                                        <Image source={{ uri: pet.photoUrls[0] }} style={styles.image} />
                                        {isMatch(like.user.id) && (
                                            <Image source={require('../../../assets/footer/match_focus.png')} style={styles.heart} />
                                        )}
                                        <Text style={styles.namePet}>{pet.name}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.loslikequemedancontainer}>
                        {loslikequemedanWithImages.length === 0 ? <View style={styles.noLike}><Text>No has recibido ningún like todavía</Text></View> : null}
                        {loslikequemedanWithImages.map((like, index) => (
                            <View key={index} style={styles.cardlist}>
                                {like.user.pets.map((pet) => (
                                    <View style={styles.card} key={pet.id}>
                                        <Image source={{ uri: pet.photoUrls[0] }} style={styles.image} blurRadius={isMatch(like.user.id) ? 0 : 30} />
                                        {isMatch(like.user.id) && (
                                            <>
                                                <Image source={require('../../../assets/footer/match_focus.png')} style={styles.heart} />
                                                <Text style={styles.namePet}>{pet.name}</Text>
                                            </>
                                        )}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )
            }
        </View>
    );
}
