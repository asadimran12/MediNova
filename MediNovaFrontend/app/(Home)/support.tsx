import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!name || !email || !message) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        Alert.alert(
            'Success',
            'Your message has been sent! We\'ll get back to you within 24 hours.',
            [{ text: 'OK', onPress: () => router.back() }]
        );
    };

    const faqItems = [
        {
            question: 'How do I create a diet plan?',
            answer: 'Simply ask in the chat: "Create me a diet plan" and our AI will generate a personalized 7-day meal plan for you.'
        },
        {
            question: 'Is my health data secure?',
            answer: 'Yes! We use industry-standard encryption and never share your personal health information with third parties.'
        },
        {
            question: 'Can I export my data?',
            answer: 'Yes, you can request a data export by contacting our support team at privacy@medinova.com.'
        },
        {
            question: 'How accurate is the AI advice?',
            answer: 'Our AI provides general wellness information. Always consult with a healthcare professional for medical advice.'
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
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => router.back()} className="p-2">
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white text-2xl font-bold flex-1 text-center mr-10">
                            Help & Support
                        </Text>
                    </View>
                </View>

                {/* Content */}
                <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                    {/* Contact Options */}
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-4">Contact Support</Text>

                        <TouchableOpacity className="flex-row items-center bg-green-50 rounded-xl p-4 mb-3">
                            <View className="bg-green-100 rounded-full p-3 mr-3">
                                <Ionicons name="mail" size={24} color="#00A67E" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-semibold">Email Support</Text>
                                <Text className="text-gray-600 text-sm">support@medinova.com</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center bg-blue-50 rounded-xl p-4 mb-3">
                            <View className="bg-blue-100 rounded-full p-3 mr-3">
                                <Ionicons name="chatbubbles" size={24} color="#3B82F6" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-semibold">Live Chat</Text>
                                <Text className="text-gray-600 text-sm">Available 9 AM - 6 PM</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center bg-purple-50 rounded-xl p-4">
                            <View className="bg-purple-100 rounded-full p-3 mr-3">
                                <Ionicons name="call" size={24} color="#A855F7" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-semibold">Phone Support</Text>
                                <Text className="text-gray-600 text-sm">+1 (555) 123-4567</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* FAQ Section */}
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-4">
                            Frequently Asked Questions
                        </Text>
                        {faqItems.map((item, index) => (
                            <View key={index} className="mb-4">
                                <Text className="text-gray-800 font-semibold mb-2">
                                    Q: {item.question}
                                </Text>
                                <Text className="text-gray-600 leading-6">
                                    A: {item.answer}
                                </Text>
                                {index < faqItems.length - 1 && (
                                    <View className="border-b border-gray-200 mt-4" />
                                )}
                            </View>
                        ))}
                    </View>

                    {/* Contact Form */}
                    <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-4">Send us a Message</Text>

                        <TextInput
                            placeholder="Your Name"
                            value={name}
                            onChangeText={setName}
                            className="bg-gray-100 rounded-xl px-4 py-3 mb-3 text-gray-800"
                        />

                        <TextInput
                            placeholder="Your Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            className="bg-gray-100 rounded-xl px-4 py-3 mb-3 text-gray-800"
                        />

                        <TextInput
                            placeholder="How can we help you?"
                            value={message}
                            onChangeText={setMessage}
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            className="bg-gray-100 rounded-xl px-4 py-3 mb-4 text-gray-800"
                        />

                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="bg-[#00A67E] rounded-xl py-4 items-center"
                        >
                            <Text className="text-white font-bold text-base">Send Message</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
