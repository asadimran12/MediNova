import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { router } from 'expo-router';

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

    const handleSend = () => {
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

        // Simulate AI response (replace with actual API call later)
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Thank you for your question. I\'m here to help. Please note that I\'m an AI assistant and my responses should not replace professional medical advice.',
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View
            className={`mb-4 flex-row ${item.isUser ? 'justify-end' : 'justify-start'
                }`}
        >
            {!item.isUser && (
                <View className="w-8 h-8 rounded-full bg-green-500 items-center justify-center mr-2">
                    <Text className="text-white font-bold">AI</Text>
                </View>
            )}
            <View
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${item.isUser
                        ? 'bg-[#00A67E] rounded-br-sm'
                        : 'bg-gray-200 rounded-bl-sm'
                    }`}
            >
                <Text className={`${item.isUser ? 'text-white' : 'text-gray-800'}`}>
                    {item.text}
                </Text>
                <Text
                    className={`text-xs mt-1 ${item.isUser ? 'text-green-100' : 'text-gray-500'
                        }`}
                >
                    {item.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
            </View>
            {item.isUser && (
                <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center ml-2">
                    <Text className="text-white font-bold">U</Text>
                </View>
            )}
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-[#00A67E] pt-12 pb-4 px-4 shadow-lg">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-white text-2xl font-bold">MediNova</Text>
                        <Text className="text-green-100 text-sm">AI Health Assistant</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="bg-white/20 rounded-full px-4 py-2"
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
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="absolute bottom-0 left-0 right-0"
            >
                <View className="bg-white border-t border-gray-200 p-4 flex-row items-center">
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
                        className="bg-[#00A67E] rounded-full p-3 shadow-md"
                        disabled={!inputText.trim()}
                    >
                        <Text className="text-white font-bold text-lg">→</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
