import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    match: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 20, 
        backgroundColor: 'white',
    },
    textMatch: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#f96247'
    },
    matchImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    card: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        marginTop: 25,
        overflow: 'hidden',
    },
    cardAbsolute: {
        position: 'absolute',
        top: 55,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        overflow: 'hidden',
        zIndex: -1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    name: {
        position: 'absolute',
        bottom: 140,
        left: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    description: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        width: '80%',
    },
    likeTextView: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    likeText: {
        color: 'white',
        borderColor: 'black',
        fontSize: 32,
    },
    dislikeTextView: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'red',
    },
    dislikeText: {
        color: 'white',
        borderColor: 'black',
        fontSize: 32,
    },
    photoIndex: {
        position: 'absolute',
        top: -10,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    photoIndexText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default styles;