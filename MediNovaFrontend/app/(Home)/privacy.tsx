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

export default function PrivacyScreen() {
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
                            Privacy Policy
                        </Text>
                    </View>
                </View>

                {/* Content */}
                <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                        <Text className="text-gray-500 text-sm mb-4">Last updated: December 16, 2024</Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">Introduction</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            MediNova ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
                        </Text>

                        <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                            <View className="flex-row items-start">
                                <Ionicons name="phone-portrait" size={20} color="#00A67E" />
                                <View className="ml-2 flex-1">
                                    <Text className="text-green-800 text-sm font-bold mb-2">
                                        Offline-First, Privacy-First
                                    </Text>
                                    <Text className="text-green-700 text-sm">
                                        By default, MediNova stores ALL your data <Text className="font-bold">locally on your device</Text>. This means your health information never leaves your phone unless you explicitly enable cloud sync.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                            <View className="flex-row items-start">
                                <Ionicons name="cloud-upload" size={20} color="#3B82F6" />
                                <Text className="text-blue-700 text-sm ml-2 flex-1">
                                    <Text className="font-bold">Cloud sync is 100% optional.</Text> You can enable it anytime in Settings if you want to backup your data or sync across devices. You control what data, if any, leaves your device.
                                </Text>
                            </View>
                        </View>

                        <Text className="text-lg font-bold text-gray-800 mb-3">1. Information We Collect</Text>

                        <Text className="text-gray-700 font-semibold mb-2">Personal Information:</Text>
                        <View className="ml-4 mb-3">
                            <Text className="text-gray-600 leading-6">• Name and email address</Text>
                            <Text className="text-gray-600 leading-6">• Username and password (encrypted)</Text>
                            <Text className="text-gray-600 leading-6">• Profile information</Text>
                        </View>

                        <Text className="text-gray-700 font-semibold mb-2">Health Information:</Text>
                        <View className="ml-4 mb-4">
                            <Text className="text-gray-600 leading-6">• Diet preferences and plans</Text>
                            <Text className="text-gray-600 leading-6">• Exercise routines</Text>
                            <Text className="text-gray-600 leading-6">• Health queries you submit to the AI</Text>
                            <Text className="text-gray-600 leading-6">• Chat history with the AI assistant</Text>
                        </View>

                        <Text className="text-gray-700 font-semibold mb-2">Usage Data:</Text>
                        <View className="ml-4 mb-4">
                            <Text className="text-gray-600 leading-6">• App usage patterns</Text>
                            <Text className="text-gray-600 leading-6">• Feature interactions</Text>
                            <Text className="text-gray-600 leading-6">• Device information</Text>
                        </View>

                        <Text className="text-lg font-bold text-gray-800 mb-3">2. How We Use Your Information</Text>
                        <View className="ml-4 mb-4">
                            <Text className="text-gray-600 leading-6">• Provide personalized health recommendations</Text>
                            <Text className="text-gray-600 leading-6">• Generate custom diet and exercise plans</Text>
                            <Text className="text-gray-600 leading-6">• Improve our AI services</Text>
                            <Text className="text-gray-600 leading-6">• Maintain and improve the App</Text>
                            <Text className="text-gray-600 leading-6">• Send important updates and notifications</Text>
                        </View>

                        <Text className="text-lg font-bold text-gray-800 mb-3">3. Data Storage and Security</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            We implement industry-standard security measures to protect your data:
                        </Text>
                        <View className="ml-4 mb-4">
                            <Text className="text-gray-600 leading-6">• Encrypted data transmission (HTTPS)</Text>
                            <Text className="text-gray-600 leading-6">• Secure password hashing (bcrypt)</Text>
                            <Text className="text-gray-600 leading-6">• Token-based authentication</Text>
                            <Text className="text-gray-600 leading-6">• Regular security updates</Text>
                        </View>

                        <Text className="text-lg font-bold text-gray-800 mb-3">4. Data Sharing</Text>
                        <View className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                            <Text className="text-orange-700 text-sm font-semibold">
                                We do NOT sell your personal information to third parties.
                            </Text>
                        </View>
                        <Text className="text-gray-600 leading-6 mb-4">
                            We may share your information only in the following cases:
                        </Text>
                        <View className="ml-4 mb-4">
                            <Text className="text-gray-600 leading-6">• With your explicit consent</Text>
                            <Text className="text-gray-600 leading-6">• To comply with legal obligations</Text>
                            <Text className="text-gray-600 leading-6">• With service providers (e.g., cloud hosting)</Text>
                            <Text className="text-gray-600 leading-6">• To protect our legal rights</Text>
                        </View>

                        <Text className="text-lg font-bold text-gray-800 mb-3">5. Your Rights</Text>
                        <Text className="text-gray-600 leading-6 mb-2">You have the right to:</Text>
                        <View className="ml-4 mb-4">
                            <Text className="text-gray-600 leading-6">• Access your personal data</Text>
                            <Text className="text-gray-600 leading-6">• Correct inaccurate data</Text>
                            <Text className="text-gray-600 leading-6">• Request data deletion</Text>
                            <Text className="text-gray-600 leading-6">• Export your data</Text>
                            <Text className="text-gray-600 leading-6">• Opt-out of certain data collection</Text>
                        </View>

                        <Text className="text-lg font-bold text-gray-800 mb-3">6. Cookies and Tracking</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            We use local storage and authentication tokens to maintain your session. We do not use third-party tracking cookies.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">7. Children's Privacy</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            Our App is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">8. Changes to Privacy Policy</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            We may update this policy periodically. We will notify you of any significant changes via email or app notification.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">9. Contact Us</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            For privacy-related questions or to exercise your rights, contact us at:
                        </Text>
                        <View className="bg-green-50 rounded-xl p-4 mb-4">
                            <Text className="text-gray-700">Email: privacy@medinova.com</Text>
                        </View>
                    </View>

                    <View className="items-center mb-6">
                        <Text className="text-gray-400 text-xs">© 2025 MediNova. All rights reserved.</Text>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
