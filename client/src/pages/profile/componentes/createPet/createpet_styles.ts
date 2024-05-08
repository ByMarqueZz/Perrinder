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
        marginTop: 240,
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 20,
        fontSize: 18,
    },
    inputDescripcion: {
        width: '100%',
        padding: 15,
        borderRadius: 20,
        fontSize: 18,
        height: 150,
        textAlignVertical: 'top',
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
    // backgrounImageHeader: {
    //     width: '100%',
    //     height: 230,
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    // },
    containerImgs: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        position: 'absolute',
        top: 0,
        padding: 10,
        width: '100%',
    },
    imgs: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: '#000',
    },
    viewImg: {
        position: 'relative',
    },
    basura: {
        position: 'absolute',
        width: 25,
        height: 25,
        top: 0,
        zIndex:9999,
    }
});