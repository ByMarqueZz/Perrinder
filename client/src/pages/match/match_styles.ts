import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 60,
        display: 'flex',
        flexDirection: 'column',
    },
    mislikescontainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    card: {
        backgroundColor: 'white',
        borderWidth: .7,
        borderColor: 'black',
        margin: 10,
        borderRadius: 10,
    },
    image: {
        width: 170,
        height: 170,
        borderRadius: 10,
    },
    noLike: {
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loslikequemedancontainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heart: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    },
    cardlist: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    namePet: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    switch: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        width: '100%',
        marginBottom: 10,
    },
    switchText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    itsTrue: {
        backgroundColor: '#f96247',
        borderRadius: 10,
    }
});