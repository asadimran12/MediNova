import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
    return (
        <ImageBackground
            source={require('../../assets/images/Background.png')}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 bg-white/90">
                {/* Header */}
                <View className="bg-[#00A67E] pt-12 pb-6 px-4 rounded-b-3xl shadow-lg">
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => router.back()} className="p-2">
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white text-2xl font-bold flex-1 text-center mr-10">
                            About MediNova
                        </Text>
                    </View>
                </View>

                {/* Content */}
                <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                    {/* Logo */}
                    <View className="items-center mb-6">
                        <Image
                            source={require('./Mainlogo.jpeg')}
                            className="w-40 h-40"
                            resizeMode="contain"
                        />
                        <Text className="text-2xl font-bold text-gray-800 mt-2">MediNova</Text>
                        <Text className="text-gray-500 text-sm">Health Assistant</Text>
                        <Text className="text-gray-400 text-xs mt-1">Version 1.0.0</Text>
                    </View>

                    {/* Description */}
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-3">
                            Our Mission
                        </Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            MediNova is your personal AI-powered health assistant designed to provide you with personalized health advice, diet plans, exercise recommendations, and wellness support.
                        </Text>
                        <Text className="text-gray-600 leading-6">
                            We leverage advanced AI technology to help you make informed decisions about your health and wellness journey.
                        </Text>
                    </View>

                    {/* Privacy First */}
                    <View className="bg-green-50 rounded-2xl p-6 mb-4 border-2 border-green-200">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="shield-checkmark" size={28} color="#00A67E" />
                            <Text className="text-lg font-bold text-gray-800 ml-2">
                                Privacy First, Offline by Default
                            </Text>
                        </View>
                        <Text className="text-gray-700 leading-6 mb-3">
                            Your health data is <Text className="font-bold">stored locally on your device</Text> by default. MediNova works fully offline, ensuring your sensitive health information stays private and secure.
                        </Text>
                        <Text className="text-gray-700 leading-6">
                            <Text className="font-bold">Cloud sync is optional</Text> - you choose if and when to enable cloud backup. Your data, your control.
                        </Text>
                    </View>

                    {/* Features */}
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-3">
                            Key Features
                        </Text>
                        <View className="space-y-3">
                            <View className="flex-row items-start mb-3">
                                <Ionicons name="cloud-offline" size={20} color="#00A67E" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 font-semibold">Works Offline</Text>
                                    <Text className="text-gray-600 text-sm">Full functionality without internet connection</Text>
                                </View>
                            </View>
                            <View className="flex-row items-start mb-3">
                                <Ionicons name="phone-portrait" size={20} color="#00A67E" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 font-semibold">Local Data Storage</Text>
                                    <Text className="text-gray-600 text-sm">Your data stays on your device, private & secure</Text>
                                </View>
                            </View>
                            <View className="flex-row items-start mb-3">
                                <Ionicons name="chatbubble-ellipses" size={20} color="#00A67E" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 font-semibold">AI Health Chat</Text>
                                    <Text className="text-gray-600 text-sm">Get instant answers to your health questions</Text>
                                </View>
                            </View>
                            <View className="flex-row items-start mb-3">
                                <Ionicons name="restaurant" size={20} color="#00A67E" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 font-semibold">Personalized Diet Plans</Text>
                                    <Text className="text-gray-600 text-sm">Customized meal plans based on your needs</Text>
                                </View>
                            </View>
                            <View className="flex-row items-start mb-3">
                                <Ionicons name="fitness" size={20} color="#00A67E" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 font-semibold">Exercise Recommendations</Text>
                                    <Text className="text-gray-600 text-sm">Tailored workout plans for your fitness goals</Text>
                                </View>
                            </View>
                            <View className="flex-row items-start">
                                <Ionicons name="analytics" size={20} color="#00A67E" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 font-semibold">Health Tracking</Text>
                                    <Text className="text-gray-600 text-sm">Monitor your progress over time</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Contact */}
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-3">
                            Contact Us
                        </Text>
                        <View className="space-y-2">
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="mail" size={18} color="#00A67E" />
                                <Text className="text-gray-600 ml-3">support@medinova.com</Text>
                            </View>
                            <View className="flex-row items-center mb-2">
                                <Ionicons name="globe" size={18} color="#00A67E" />
                                <Text className="text-gray-600 ml-3">www.medinova.com</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="location" size={18} color="#00A67E" />
                                <Text className="text-gray-600 ml-3">Health Tech Innovation Center</Text>
                            </View>
                        </View>
                    </View>

                    {/* Copyright */}
                    <View className="items-center mt-4 mb-6">
                        <Text className="text-gray-400 text-xs">© 2024 MediNova. All rights reserved.</Text>
                        <Text className="text-gray-400 text-xs mt-1">Made with ❤️ for your health</Text>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
