import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        bloodType: '',
        height: '',
        weight: '',
        allergies: '',
        emergencyContact: '',
    });

    const API_URL = __DEV__
        ? 'http://192.168.43.32:8000'
        : 'https://medinova-igij.onrender.com';

    // Load profile data on mount
    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                router.replace('/(tabs)');
                return;
            }

            const response = await fetch(`${API_URL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success && data.profile) {
                setUserData({
                    name: data.profile.username || '',
                    email: data.profile.email || '',
                    phone: data.profile.phone || '',
                    age: data.profile.age?.toString() || '',
                    gender: data.profile.gender || '',
                    bloodType: data.profile.blood_type || '',
                    height: data.profile.height?.toString() || '',
                    weight: data.profile.weight?.toString() || '',
                    allergies: data.profile.allergies || '',
                    emergencyContact: data.profile.emergency_contact || '',
                });
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            Alert.alert('Error', 'Failed to load profile data');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateBMI = () => {
        const heightInM = parseFloat(userData.height) / 100;
        const weightInKg = parseFloat(userData.weight);
        if (!heightInM || !weightInKg) return '0.0';
        const bmi = weightInKg / (heightInM * heightInM);
        return bmi.toFixed(1);
    };

    const getBMIStatus = () => {
        const bmi = parseFloat(calculateBMI());
        if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-600' };
        if (bmi < 25) return { status: 'Normal', color: 'text-green-600' };
        if (bmi < 30) return { status: 'Overweight', color: 'text-orange-600' };
        return { status: 'Obese', color: 'text-red-600' };
    };

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'Not authenticated');
                return;
            }

            const response = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: userData.phone || null,
                    age: userData.age ? parseInt(userData.age) : null,
                    gender: userData.gender || null,
                    blood_type: userData.bloodType || null,
                    height: userData.height ? parseFloat(userData.height) : null,
                    weight: userData.weight ? parseFloat(userData.weight) : null,
                    allergies: userData.allergies || null,
                    emergency_contact: userData.emergencyContact || null,
                })
            });

            const data = await response.json();

            if (data.success) {
                setIsEditing(false);
                Alert.alert('Success', 'Profile updated successfully!');
            } else {
                Alert.alert('Error', 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'Failed to save profile data');
        }
    };

    const InfoField = ({ label, value, icon, editable = true, keyboardType = 'default' }: any) => (
        <View className="mb-4">
            <Text className="text-gray-500 text-sm mb-1 font-medium">{label}</Text>
            <View className="bg-white rounded-xl p-4 flex-row items-center border border-gray-200">
                <Ionicons name={icon} size={20} color="#00A67E" style={{ marginRight: 12 }} />
                {isEditing && editable ? (
                    <TextInput
                        value={value}
                        onChangeText={(text) => setUserData({ ...userData, [label.toLowerCase().replace(' ', '')]: text })}
                        className="flex-1 text-gray-800 text-base"
                        keyboardType={keyboardType}
                        placeholder={`Enter ${label.toLowerCase()}`}
                    />
                ) : (
                    <Text className="flex-1 text-gray-800 text-base">
                        {value || <Text className="text-gray-400">Not set</Text>}
                    </Text>
                )}
            </View>
        </View>
    );

    const bmiStatus = getBMIStatus();

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
                        <Text className="text-white text-2xl font-bold flex-1 text-center">
                            Profile
                        </Text>
                        <TouchableOpacity
                            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
                            className="p-2"
                        >
                            <Ionicons name={isEditing ? 'checkmark' : 'create-outline'} size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Avatar */}
                    <View className="items-center mb-4">
                        <View className="bg-white/20 rounded-full p-1 mb-3">
                            <View className="bg-white rounded-full p-4">
                                <Ionicons name="person" size={64} color="#00A67E" />
                            </View>
                        </View>
                        <Text className="text-white text-xl font-bold">{userData.name}</Text>
                        <Text className="text-white/80 text-sm">{userData.email}</Text>
                    </View>
                </View>

                <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
                    {isLoading ? (
                        <View className="flex-1 items-center justify-center py-20">
                            <ActivityIndicator size="large" color="#00A67E" />
                            <Text className="text-gray-500 mt-4">Loading profile...</Text>
                        </View>
                    ) : (
                        <>
                            {/* Health Metrics Card */}
                            <View className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 mb-4 shadow-lg">
                                <Text className="text-white text-lg font-bold mb-3">Health Metrics</Text>
                                <View className="flex-row justify-around">
                                    <View className="items-center">
                                        <Text className="text-white text-2xl font-bold">{userData.height || '-'}</Text>
                                        <Text className="text-white/80 text-xs">Height (cm)</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-white text-2xl font-bold">{userData.weight || '-'}</Text>
                                        <Text className="text-white/80 text-xs">Weight (kg)</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-white text-2xl font-bold">{calculateBMI()}</Text>
                                        <Text className="text-white/80 text-xs">BMI</Text>
                                    </View>
                                </View>
                                <View className="bg-white/20 rounded-xl p-2 mt-3 items-center">
                                    <Text className="text-white text-sm font-semibold">
                                        Status: {getBMIStatus().status}
                                    </Text>
                                </View>
                            </View>

                            {/* Personal Information */}
                            <View className="mb-4">
                                <Text className="text-gray-700 text-lg font-bold mb-3">Personal Information</Text>
                                <InfoField label="Name" value={userData.name} icon="person-outline" />
                                <InfoField label="Email" value={userData.email} icon="mail-outline" keyboardType="email-address" />
                                <InfoField label="Phone" value={userData.phone} icon="call-outline" keyboardType="phone-pad" />
                                <InfoField label="Age" value={userData.age} icon="calendar-outline" keyboardType="numeric" />
                                <InfoField label="Gender" value={userData.gender} icon="male-female-outline" />
                                <InfoField label="Blood Type" value={userData.bloodType} icon="water-outline" />
                            </View>

                            {/* Health Information */}
                            <View className="mb-4">
                                <Text className="text-gray-700 text-lg font-bold mb-3">Health Information</Text>
                                <InfoField label="Height" value={userData.height} icon="resize-outline" keyboardType="numeric" />
                                <InfoField label="Weight" value={userData.weight} icon="fitness-outline" keyboardType="numeric" />
                                <InfoField label="Allergies" value={userData.allergies} icon="alert-circle-outline" />
                            </View>

                            {/* Emergency Contact */}
                            <View className="mb-4">
                                <Text className="text-gray-700 text-lg font-bold mb-3">Emergency Contact</Text>
                                <InfoField
                                    label="Emergency Contact"
                                    value={userData.emergencyContact}
                                    icon="call-outline"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            {/* Action Buttons */}
                            <View className="mb-6">
                                <TouchableOpacity
                                    className="bg-blue-500 rounded-2xl p-4 flex-row items-center justify-center shadow-md mb-3"
                                >
                                    <Ionicons name="document-text-outline" size={24} color="white" style={{ marginRight: 8 }} />
                                    <Text className="text-white text-lg font-bold">View Medical Records</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="bg-purple-500 rounded-2xl p-4 flex-row items-center justify-center shadow-md mb-3"
                                >
                                    <Ionicons name="share-social-outline" size={24} color="white" style={{ marginRight: 8 }} />
                                    <Text className="text-white text-lg font-bold">Share Profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            'Delete Account',
                                            'Are you sure you want to delete your account? This action cannot be undone.',
                                            [
                                                { text: 'Cancel', style: 'cancel' },
                                                { text: 'Delete', style: 'destructive' }
                                            ]
                                        );
                                    }}
                                    className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 flex-row items-center justify-center mb-6"
                                >
                                    <Ionicons name="trash-outline" size={24} color="#EF4444" style={{ marginRight: 8 }} />
                                    <Text className="text-red-500 text-lg font-bold">Delete Account</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
