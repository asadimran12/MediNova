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

export default function TermsScreen() {
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
                            Terms of Service
                        </Text>
                    </View>
                </View>

                {/* Content */}
                <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                        <Text className="text-gray-500 text-sm mb-4">Last updated: December 16, 2024</Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">1. Acceptance of Terms</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            By accessing and using MediNova ("the App"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this App.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">2. Use of Service</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            MediNova provides health and wellness information through AI-powered technology. The information provided is for educational purposes only and should not be considered as medical advice, diagnosis, or treatment.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">3. Medical Disclaimer</Text>
                        <View className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                            <View className="flex-row items-start">
                                <Ionicons name="warning" size={20} color="#F97316" />
                                <Text className="text-orange-700 text-sm ml-2 flex-1">
                                    Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this App.
                                </Text>
                            </View>
                        </View>

                        <Text className="text-lg font-bold text-gray-800 mb-3">4. User Responsibilities</Text>
                        <Text className="text-gray-600 leading-6 mb-2">You agree to:</Text>
                        <View className="ml-4 mb-4">
                            <Text className="text-gray-600 leading-6">• Provide accurate information</Text>
                            <Text className="text-gray-600 leading-6">• Keep your account secure</Text>
                            <Text className="text-gray-600 leading-6">• Use the App lawfully</Text>
                            <Text className="text-gray-600 leading-6">• Not misuse the service</Text>
                            <Text className="text-gray-600 leading-6">• Respect other users</Text>
                        </View>

                        <Text className="text-lg font-bold text-gray-800 mb-3">5. Account Security</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">6. Data Usage</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            We collect and use your data as described in our Privacy Policy. By using the App, you consent to such processing and you warrant that all data provided by you is accurate.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">7. Intellectual Property</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            All content, features, and functionality of the App are owned by MediNova and are protected by international copyright, trademark, and other intellectual property laws.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">8. Limitation of Liability</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            MediNova shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">9. Changes to Terms</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            We reserve the right to modify these terms at any time. Continued use of the App after any such changes constitutes your acceptance of the new terms.
                        </Text>

                        <Text className="text-lg font-bold text-gray-800 mb-3">10. Contact Information</Text>
                        <Text className="text-gray-600 leading-6 mb-4">
                            If you have any questions about these Terms, please contact us at:
                        </Text>
                        <View className="bg-green-50 rounded-xl p-4 mb-4">
                            <Text className="text-gray-700">Email: legal@medinova.com</Text>
                            <Text className="text-gray-700">Website: www.medinova.com/support</Text>
                        </View>
                    </View>

                    <View className="items-center mb-6">
                        <Text className="text-gray-400 text-xs">© 2024 MediNova. All rights reserved.</Text>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
