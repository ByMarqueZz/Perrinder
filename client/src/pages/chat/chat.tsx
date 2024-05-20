import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import io from 'socket.io-client';
import store from '../../redux/store';
import styles from './chat_styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([]);
    const socket = io(store.getState().url);
    const [userId, setUserId] = useState<string>('');
    const [roomId, setRoomId] = useState<string>('');

    useEffect(() => {
        if (roomId == '' || roomId == null) return;
        socket.emit('joinRoom', { roomId });

        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('message');
        };
    }, [roomId]);

    useEffect(() => {
        const fetchUserId = async () => {
            const user = await AsyncStorage.getItem('user');
            const userParsed = user ? JSON.parse(user) : null;
            if (!userParsed) {
                alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
                return;
            }
            setUserId(userParsed.id);
            return userParsed.id;
        };
        const fetchRoomId = async (userId: number) => {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${store.getState().url}/chat/rooms/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const data = await response.json();
                setRoomId(data.id);
            } else {
                console.log({status: response.status, response});
                alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
            }
        };
        fetchUserId().then((userId: number) => {
            fetchRoomId(userId);
        });
    }, []);

    const sendMessage = () => {
        socket.emit('message', { roomId, message, senderId: userId });
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={messages}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.sender.name}: {item.content}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Enter message"
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

export default Chat;
