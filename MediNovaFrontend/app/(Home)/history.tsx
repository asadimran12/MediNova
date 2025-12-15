import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HistoryItem {
    id: string;
    date: string;
    time: string;
    title: string;
    summary: string;
    category: 'consultation' | 'diet' | 'medication' | 'checkup';
}

export default function HistoryScreen() {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    const filters = [
        { id: 'all', label: 'All', icon: 'apps' },
        { id: 'consultation', label: 'Consultations', icon: 'chatbubbles' },
        { id: 'diet', label: 'Diet', icon: 'restaurant' },
        { id: 'medication', label: 'Medication', icon: 'medkit' },
        { id: 'checkup', label: 'Checkups', icon: 'fitness' },
    ];

    // Sample history data
    const historyData: HistoryItem[] = [
        {
            id: '1',
            date: '2025-12-15',
            time: '09:30 AM',
            title: 'AI Health Consultation',
            summary: 'Discussed symptoms of headache and received recommendations for rest and hydration.',
            category: 'consultation',
        },
        {
            id: '2',
            date: '2025-12-14',
            time: '02:15 PM',
            title: 'Diet Plan Generated',
            summary: 'Created personalized 7-day diet plan focusing on high protein and low carbs.',
            category: 'diet',
        },
        {
            id: '3',
            date: '2025-12-13',
            time: '11:00 AM',
            title: 'Medication Reminder',
            summary: 'Vitamin D supplement taken as prescribed.',
            category: 'medication',
        },
        {
            id: '4',
            date: '2025-12-12',
            time: '08:45 AM',
            title: 'Morning Health Check',
            summary: 'Blood pressure: 120/80, Heart rate: 72 bpm, Weight: 70kg',
            category: 'checkup',
        },
        {
            id: '5',
            date: '2025-12-11',
            time: '04:30 PM',
            title: 'AI Consultation - Cold Symptoms',
            summary: 'Received advice on managing common cold symptoms and recommended rest.',
            category: 'consultation',
        },
    ];

    const getCategoryColor = (category: string) => {
        const colors = {
            consultation: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
            diet: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
            medication: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
            checkup: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
        };
        return colors[category as keyof typeof colors] || colors.consultation;
    };

    const getCategoryIcon = (category: string) => {
        const icons = {
            consultation: 'chatbubbles',
            diet: 'restaurant',
            medication: 'medkit',
            checkup: 'fitness',
        };
        return icons[category as keyof typeof icons] || 'document-text';
    };

    const filteredHistory = selectedFilter === 'all'
        ? historyData
        : historyData.filter(item => item.category === selectedFilter);

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
                            History
                        </Text>
                    </View>

                    {/* Stats Summary */}
                    <View className="bg-white/20 rounded-2xl p-4">
                        <View className="flex-row justify-around">
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{historyData.length}</Text>
                                <Text className="text-white/80 text-xs">Total Records</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">
                                    {historyData.filter(h => h.category === 'consultation').length}
                                </Text>
                                <Text className="text-white/80 text-xs">Consultations</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">
                                    {historyData.filter(h => h.category === 'checkup').length}
                                </Text>
                                <Text className="text-white/80 text-xs">Checkups</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Filter Tabs */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="max-h-20 bg-white border-b border-gray-200"
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                >
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter.id}
                            onPress={() => setSelectedFilter(filter.id)}
                            className={selectedFilter === filter.id
                                ? 'flex-row items-center px-4 py-2 rounded-full mr-2 bg-[#00A67E]'
                                : 'flex-row items-center px-4 py-2 rounded-full mr-2 bg-gray-100'}
                        >
                            <Ionicons
                                name={filter.icon as any}
                                size={16}
                                color={selectedFilter === filter.id ? 'white' : '#6B7280'}
                                style={{ marginRight: 6 }}
                            />
                            <Text className={selectedFilter === filter.id ? 'font-semibold text-white' : 'font-semibold text-gray-600'}>
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* History List */}
                <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
                    {filteredHistory.length === 0 ? (
                        <View className="items-center justify-center py-20">
                            <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
                            <Text className="text-gray-400 text-lg mt-4">No records found</Text>
                        </View>
                    ) : (
                        filteredHistory.map((item) => {
                            const colors = getCategoryColor(item.category);
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
                                >
                                    <View className="flex-row items-start">
                                        <View className={`${colors.bg} rounded-full p-3 mr-3`}>
                                            <Ionicons
                                                name={getCategoryIcon(item.category) as any}
                                                size={24}
                                                color={colors.text.replace('text-', '#')}
                                            />
                                        </View>

                                        <View className="flex-1">
                                            <View className="flex-row items-center justify-between mb-1">
                                                <Text className="text-gray-800 font-bold text-base flex-1">
                                                    {item.title}
                                                </Text>
                                                <View className={`${colors.bg} px-3 py-1 rounded-full border ${colors.border}`}>
                                                    <Text className={`${colors.text} text-xs font-medium capitalize`}>
                                                        {item.category}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View className="flex-row items-center mb-2">
                                                <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                                                <Text className="text-gray-500 text-sm ml-1">{item.date}</Text>
                                                <Ionicons name="time-outline" size={14} color="#9CA3AF" style={{ marginLeft: 12 }} />
                                                <Text className="text-gray-500 text-sm ml-1">{item.time}</Text>
                                            </View>

                                            <Text className="text-gray-600 text-sm leading-5">
                                                {item.summary}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    )}

                    {/* Export Button */}
                    <TouchableOpacity
                        className="bg-white border-2 border-[#00A67E] rounded-2xl p-4 flex-row items-center justify-center shadow-sm mt-2 mb-6"
                    >
                        <Ionicons name="download-outline" size={24} color="#00A67E" style={{ marginRight: 8 }} />
                        <Text className="text-[#00A67E] text-lg font-bold">
                            Export History
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
