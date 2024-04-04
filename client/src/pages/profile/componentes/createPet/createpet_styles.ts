import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    containerDiv: {
        marginTop: 250
    },
    input: {
        width: '105%',
        padding: 15,
        borderRadius: 20,
        fontSize: 18,
    },
    autocomplete: {
        backgroundColor: 'transparent',
        borderColor: '#000',
    },
    image: {
        width: 35,
        height: 35,
        position: 'absolute',
        left: 0,
        top: 60,
    },
    container_buttons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        paddingTop: 20,
        alignSelf: 'center',
    },
    backgrounImageHeader: {
        width: '100%',
        height: 230,
        position: 'absolute',
        top: 0,
        left: 0,
    },
});