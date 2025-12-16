import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Image,
    Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Sidebar from './sidebar';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function HomeScreen() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m MediNova AI Assistant. How can I help you with your health today?',
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<number>(1); // Default to 1

    const API_URL = 'https://medinova-igij.onrender.com/chat/';
    const AUTH_URL = 'https://medinova-igij.onrender.com/auth';

    // Verify token and load user ID on mount
    useEffect(() => {
        const verifyAndLoadUser = async () => {
            try {
                // Get token from AsyncStorage
                const token = await AsyncStorage.getItem('token');

                if (!token) {
                    // No token, redirect to login
                    console.log('No token found, redirecting to login');
                    router.replace('/(tabs)');
                    return;
                }

                // Verify token with backend
                const verifyResponse = await fetch(`${AUTH_URL}/verify`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!verifyResponse.ok) {
                    // Token is invalid, clear storage and redirect to login
                    console.log('Token invalid, redirecting to login');
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('user');
                    router.replace('/(tabs)');
                    return;
                }

                // Token is valid, load user data
                const userStr = await AsyncStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    setUserId(user.id || 1);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                // Network error or other issues, redirect to login
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('user');
                router.replace('/(tabs)');
            }
        };
        verifyAndLoadUser();
    }, []);

    const pickImageFromCamera = async () => {
        setShowAttachmentMenu(false);
        alert('Camera feature is being configured. Please check back soon!');
        /*
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to take photos!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            // Handle the image - you can send it as a message or upload it
            console.log('Camera image:', result.assets[0].uri);
            // TODO: Add image message to chat
        }
        */
    };

    const pickImageFromGallery = async () => {
        setShowAttachmentMenu(false);
        alert('Gallery feature is being configured. Please check back soon!');
        /*
        // Request media library permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need gallery permissions to select photos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            // Handle the image
            console.log('Gallery image:', result.assets[0].uri);
            // TODO: Add image message to chat
        }
        */
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputText,
                    user_id: userId
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: data.response || "I couldn't generate a response.",
                    isUser: false,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiMessage]);
            } else {
                console.error("API Error:", data);
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "Sorry, I encountered an error communicating with the server.",
                    isUser: false,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error("Network Error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I couldn't reach the server. Please check your connection.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View
            className={`mb-4 flex-row ${item.isUser ? 'justify-end' : 'justify-start'}`}
        >
            {/* AI Avatar (Left) */}
            {!item.isUser && (
                <View className="w-10 h-10 rounded-full bg-[#00A67E] items-center justify-center mr-3">
                    <Ionicons name="sparkles" size={20} color="white" />
                </View>
            )}

            {/* Message Content */}
            <View
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${item.isUser
                    ? 'bg-blue-500 rounded-tr-none'
                    : 'bg-gray-100 rounded-tl-none border border-gray-200'
                    }`}
            >
                <Text className={`${item.isUser ? 'text-white' : 'text-gray-800'} text-base leading-relaxed`}>
                    {item.text}
                </Text>
                <Text
                    className={`text-xs mt-1 ${item.isUser ? 'text-blue-100' : 'text-gray-500'
                        }`}
                >
                    {item.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
            </View>

            {/* User Avatar (Right) */}
            {item.isUser && (
                <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center ml-3">
                    <Text className="text-white font-bold text-lg">U</Text>
                </View>
            )}
        </View>
    );

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View className="flex-1 bg-white">
                {/* Header */}
                <View className="bg-white pt-2 px-4 shadow-lg border-b border-gray-200">
                    <View className="flex-row justify-between items-center">
                        {/* Left Side Icons */}
                        <View className="flex-row items-center gap-3">
                            {/* Hamburger Menu for Sidebar */}
                            <TouchableOpacity
                                onPress={() => setShowSidebar(true)}
                                className="bg-green-100 rounded-full p-2"
                            >
                                <Ionicons name="menu" size={28} color="#00A67E" />
                            </TouchableOpacity>

                        </View>

                        {/* Center Title */}
                        <View className="flex-1 items-center">
                            <Image
                                source={require('./Mainlogo.jpeg')}
                                style={{ width: 150, height: 100 }}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Right Side Logout */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="bg-[#00A67E] rounded-full px-4 py-2"
                        >
                            <Text className="text-white font-semibold">Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Chat Messages */}
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />

                {/* Input Area */}
                <View className="bg-white border-t border-gray-200 p-4 flex-row items-center">
                    {/* Plus Icon for Attachments */}
                    <TouchableOpacity
                        onPress={() => setShowAttachmentMenu(true)}
                        className="bg-gray-100 rounded-full p-2 mr-2"
                    >
                        <Ionicons name="add" size={24} color="#00A67E" />
                    </TouchableOpacity>

                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type your health question..."
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2"
                        multiline
                        maxLength={500}
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        className="bg-[#00A67E] rounded-full p-2 shadow-md"
                        disabled={!inputText.trim()}
                    >
                        <Text className="text-white font-bold text-lg">→</Text>
                    </TouchableOpacity>
                </View>

                {/* Attachment Menu Modal */}
                <Modal
                    visible={showAttachmentMenu}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowAttachmentMenu(false)}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setShowAttachmentMenu(false)}
                        className="flex-1 bg-black/50 justify-end"
                    >
                        <View className="bg-white rounded-t-3xl p-6">
                            <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
                                Add Attachment
                            </Text>

                            <TouchableOpacity
                                onPress={pickImageFromCamera}
                                className="flex-row items-center bg-green-50 rounded-xl p-4 mb-3"
                            >
                                <View className="bg-[#00A67E] rounded-full p-3 mr-4">
                                    <Ionicons name="camera" size={24} color="white" />
                                </View>
                                <View>
                                    <Text className="text-lg font-semibold text-gray-800">Camera</Text>
                                    <Text className="text-sm text-gray-500">Take a photo</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={pickImageFromGallery}
                                className="flex-row items-center bg-green-50 rounded-xl p-4 mb-3"
                            >
                                <View className="bg-[#00A67E] rounded-full p-3 mr-4">
                                    <Ionicons name="images" size={24} color="white" />
                                </View>
                                <View>
                                    <Text className="text-lg font-semibold text-gray-800">Gallery</Text>
                                    <Text className="text-sm text-gray-500">Choose from gallery</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setShowAttachmentMenu(false)}
                                className="bg-gray-200 rounded-xl p-4 mt-2"
                            >
                                <Text className="text-center text-gray-700 font-semibold">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* Sidebar Modal */}
                <Modal
                    visible={showSidebar}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowSidebar(false)}
                >
                    <View className="flex-1 flex-row">
                        {/* Sidebar Content */}
                        <View className="w-4/5 bg-white">
                            <Sidebar onClose={() => setShowSidebar(false)} />
                        </View>
                        {/* Overlay to close sidebar */}
                        <TouchableOpacity
                            className="flex-1 bg-black/50"
                            activeOpacity={1}
                            onPress={() => setShowSidebar(false)}
                        />
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    );
}
