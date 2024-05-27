import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import store from '../../redux/store';
import styles from './chat_styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatRoom, Message, User } from '../../interfaces/interfaces';

const Chat = ({room, goBack}: {room: ChatRoom, goBack: () => void}) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const socket = io(store.getState().url);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (room.id == null) return;
        socket.emit('joinRoom', room.id );

        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('message');
        };
    }, [room]);

    useEffect(() => {
        const fetchUserId = async () => {
            const user = await AsyncStorage.getItem('user');
            const userParsed = user ? JSON.parse(user) : null;
            if (!userParsed) {
                alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
                return;
            }
            setUser(userParsed);
        };
        const fetchMessages = async () => {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${store.getState().url}/chat/room/${room.id}/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const data = await response.json();
                setMessages(data);
            } else {
                alert('Ha ocurrido un error, por favor, vuelve a iniciar sesión');
            }
        };
        fetchUserId();
        fetchMessages();
    }, []);

    const sendMessage = () => {
        socket.emit('message', { roomId: room.id, message, senderId: user.id });
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBack} onPress={() => {
                    goBack()
                }}>
                <Text style={styles.goBackText}>Ir atrás</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.flatList}
                data={messages}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.sender.firstName}: {item.content}</Text>
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
