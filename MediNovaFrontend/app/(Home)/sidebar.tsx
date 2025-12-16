import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface SidebarProps {
    onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
    const menuItems = [
        { icon: 'restaurant', label: 'Diet Plan', route: '/(Home)/diet-plan' },
        { icon: 'fitness', label: 'Exercise Plan', route: '/(Home)/exercise-plan' },
        { icon: 'time', label: 'History', route: '/(Home)/history' },
        { icon: 'person', label: 'Profile', route: '/(Home)/profile' },
        { icon: 'settings', label: 'Settings', route: '/(Home)/settings' },
    ];

    const handleMenuPress = (route: string) => {
        onClose();
        router.push(route as any);
    };

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                // Call backend logout endpoint
                await fetch('https://medinova-igij.onrender.com/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear storage regardless of backend response
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            onClose();
            router.replace('/(tabs)');
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-white pt-12 px-4 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-4">
                    <Image
                        source={require("../(Home)/Mainlogo.jpeg")}
                        style={{ width: 120, height: 80 }}
                        resizeMode="contain"
                    />
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color="#00A67E" />
                    </TouchableOpacity>
                </View>

                {/* User Info */}
                <View className="flex-row items-center mb-4">
                    <View className="bg-green-100 rounded-full p-3 mr-3">
                        <Ionicons name="person" size={32} color="#00A67E" />
                    </View>
                    <View>
                        <Text className="text-gray-800 text-lg font-bold">Welcome Back!</Text>
                        <Text className="text-gray-500 text-sm">User</Text>
                    </View>
                </View>
            </View>

            {/* Menu Items */}
            <ScrollView className="flex-1 px-2 py-4">
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleMenuPress(item.route)}
                        className="flex-row items-center px-4 py-4 mb-2 rounded-xl active:bg-green-50"
                    >
                        <View className="bg-green-100 rounded-full p-2 mr-4">
                            <Ionicons name={item.icon as any} size={24} color="#00A67E" />
                        </View>
                        <Text className="text-gray-800 text-base font-medium flex-1">
                            {item.label}
                        </Text>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Footer */}
            <View className="border-t border-gray-200 p-4">
                <TouchableOpacity
                    onPress={handleLogout}
                    className="flex-row items-center justify-center bg-red-50 rounded-xl p-4"
                >
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                    <Text className="text-red-500 font-semibold ml-2">Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}