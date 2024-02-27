import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        position: 'absolute',
        top: 120,
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        
        flexDirection: 'row',
        alignItems: 'center'
    },
    title_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2
    },
    legendText: {
        fontSize: 18,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 2
    },
    imageDogFoot: {
        maxWidth: 80,
        maxHeight: 80
    },
    container_button: {
        backgroundColor: 'black',
        width: '95%',
        padding: 15,
        borderRadius: 20,
    },
    container_button2: {
        backgroundColor: 'tomato',
        width: '95%',
        padding: 15,
        borderRadius: 20,
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        height: height,
    },
    container_button_view: {
        flex: 1,
        position: 'absolute',
        bottom: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_button_view2: {
        flex: 1,
        position: 'absolute',
        bottom: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_button: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
});
