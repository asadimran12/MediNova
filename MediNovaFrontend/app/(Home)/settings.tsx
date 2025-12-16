import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
    const [cloudSyncEnabled, setCloudSyncEnabled] = React.useState(false);

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-4 shadow-lg border-b border-gray-200">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <Ionicons name="arrow-back" size={24} color="#00A67E" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-gray-800">Settings</Text>
                </View>
            </View>

            <ScrollView className="flex-1">
                {/* Account Section */}
                <View className="mt-6 px-4">
                    <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                        Account
                    </Text>

                    <TouchableOpacity className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="person-outline" size={24} color="#00A67E" />
                            </View>
                            <Text className="text-base text-gray-800">Edit Profile</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="lock-closed-outline" size={24} color="#00A67E" />
                            </View>
                            <Text className="text-base text-gray-800">Change Password</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                {/* Preferences Section */}
                <View className="mt-6 px-4">
                    <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                        Preferences
                    </Text>

                    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="notifications-outline" size={24} color="#00A67E" />
                            </View>
                            <Text className="text-base text-gray-800">Notifications</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                            thumbColor={notificationsEnabled ? '#00A67E' : '#F3F4F6'}
                        />
                    </View>

                    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="moon-outline" size={24} color="#00A67E" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-base text-gray-800">Dark Mode</Text>
                                <Text className="text-xs text-orange-500">Coming Soon</Text>
                            </View>
                        </View>
                        <Switch
                            value={darkModeEnabled}
                            onValueChange={setDarkModeEnabled}
                            trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                            thumbColor={darkModeEnabled ? '#00A67E' : '#F3F4F6'}
                            disabled={true}
                        />
                    </View>

                    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="cloud-upload-outline" size={24} color="#00A67E" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-base text-gray-800">Cloud Sync</Text>
                                <Text className="text-xs text-gray-500">Data stored locally by default</Text>
                            </View>
                        </View>
                        <Switch
                            value={cloudSyncEnabled}
                            onValueChange={setCloudSyncEnabled}
                            trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                            thumbColor={cloudSyncEnabled ? '#00A67E' : '#F3F4F6'}
                        />
                    </View>

                    <TouchableOpacity className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="language-outline" size={24} color="#00A67E" />
                            </View>
                            <Text className="text-base text-gray-800">Language</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-gray-500 mr-2">English</Text>
                            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                        </View>
                    </TouchableOpacity>

                    {/* Info about local storage */}
                    <View className="bg-green-50 border border-green-200 rounded-xl p-3 mt-2">
                        <View className="flex-row items-start">
                            <Ionicons name="shield-checkmark" size={16} color="#00A67E" />
                            <Text className="text-green-700 text-xs ml-2 flex-1">
                                Your health data is stored locally on your device for maximum privacy. Enable Cloud Sync only if you want to backup or sync across devices.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* About Section */}
                <View className="mt-6 px-4">
                    <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                        About
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push('/(Home)/about')}
                        className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="information-circle-outline" size={24} color="#00A67E" />
                            </View>
                            <Text className="text-base text-gray-800">About MediNova</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/(Home)/privacy')}
                        className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="document-text-outline" size={24} color="#00A67E" />
                            </View>
                            <Text className="text-base text-gray-800">Privacy Policy</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/(Home)/terms')}
                        className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="shield-checkmark-outline" size={24} color="#00A67E" />
                            </View>
                            <Text className="text-base text-gray-800">Terms of Service</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                {/* Support Section */}
                <View className="mt-6 px-4 mb-8">
                    <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                        Support
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push('/(Home)/support')}
                        className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-green-100 rounded-full p-2 mr-3">
                                <Ionicons name="help-circle-outline" size={24} color="#00A67E" />
                            </View>
                            <Text className="text-base text-gray-800">Help & Support</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    {/* App Version */}
                    <View className="bg-gray-50 rounded-xl p-4 mt-4 items-center">
                        <Text className="text-gray-600 text-sm">MediNova Health Assistant</Text>
                        <Text className="text-gray-500 text-xs mt-1">Version 1.0.0</Text>
                        <Text className="text-gray-400 text-xs mt-1">© 2025 MediNova</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
