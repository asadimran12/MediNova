import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ChatHistoryItem {
    id: string;
    date: string;
    time: string;
    preview: string;
    messageCount: number;
}

export default function HistoryScreen() {
    // Sample chat history data
    const chatHistory: ChatHistoryItem[] = [
        {
            id: '1',
            date: 'Dec 15, 2025',
            time: '09:30 AM',
            preview: 'Can you help me with a diet plan for weight loss?',
            messageCount: 12,
        },
        {
            id: '2',
            date: 'Dec 14, 2025',
            time: '02:15 PM',
            preview: 'What are the symptoms of common cold and how to treat it?',
            messageCount: 8,
        },
        {
            id: '3',
            date: 'Dec 13, 2025',
            time: '11:00 AM',
            preview: 'I need advice on managing stress and anxiety',
            messageCount: 15,
        },
        {
            id: '4',
            date: 'Dec 12, 2025',
            time: '08:45 AM',
            preview: 'Can you recommend exercises for lower back pain?',
            messageCount: 10,
        },
        {
            id: '5',
            date: 'Dec 11, 2025',
            time: '04:30 PM',
            preview: 'What foods should I avoid with high cholesterol?',
            messageCount: 7,
        },
    ];

    return (
        <ImageBackground
            source={require('../../assets/images/Background.png')}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 bg-white/90">
                {/* Header */}
                <View className="bg-[#00A67E] pt-12 pb-6 px-4 rounded-b-3xl shadow-lg">
                    <View className="flex-row items-center justify-between mb-4">
                        <TouchableOpacity onPress={() => router.back()} className="p-2">
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white text-2xl font-bold flex-1 text-center mr-10">
                            Chat History
                        </Text>
                    </View>

                    {/* Stats Summary */}
                    <View className="bg-white/20 rounded-2xl p-4">
                        <View className="flex-row justify-around">
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{chatHistory.length}</Text>
                                <Text className="text-white/80 text-xs">Conversations</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">
                                    {chatHistory.reduce((sum, chat) => sum + chat.messageCount, 0)}
                                </Text>
                                <Text className="text-white/80 text-xs">Total Messages</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">7</Text>
                                <Text className="text-white/80 text-xs">Days Active</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Chat History List */}
                <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
                    {chatHistory.length === 0 ? (
                        <View className="items-center justify-center py-20">
                            <Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
                            <Text className="text-gray-400 text-lg mt-4">No chat history</Text>
                        </View>
                    ) : (
                        chatHistory.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
                            >
                                <View className="flex-row items-start">
                                    <View className="bg-[#00A67E]/10 rounded-full p-3 mr-3">
                                        <Ionicons
                                            name="chatbubble-ellipses"
                                            size={24}
                                            color="#00A67E"
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <View className="flex-row items-center justify-between mb-2">
                                            <Text className="text-gray-800 font-bold text-base flex-1">
                                                Chat Conversation
                                            </Text>
                                            <View className="bg-blue-50 px-3 py-1 rounded-full">
                                                <Text className="text-blue-600 text-xs font-medium">
                                                    {item.messageCount} messages
                                                </Text>
                                            </View>
                                        </View>

                                        <View className="flex-row items-center mb-2">
                                            <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                                            <Text className="text-gray-500 text-sm ml-1">{item.date}</Text>
                                            <Ionicons name="time-outline" size={14} color="#9CA3AF" style={{ marginLeft: 12 }} />
                                            <Text className="text-gray-500 text-sm ml-1">{item.time}</Text>
                                        </View>

                                        <Text className="text-gray-600 text-sm leading-5" numberOfLines={2}>
                                            {item.preview}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}

                    {/* Clear History Button */}
                    <TouchableOpacity
                        className="bg-white border-2 border-red-500 rounded-2xl p-4 flex-row items-center justify-center shadow-sm mt-2 mb-6"
                    >
                        <Ionicons name="trash-outline" size={24} color="#EF4444" style={{ marginRight: 8 }} />
                        <Text className="text-red-500 text-lg font-bold">
                            Clear History
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
