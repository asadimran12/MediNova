import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Constants from 'expo-constants';

// Backend API URL
const API_URL = __DEV__
  ? 'http://192.168.43.32:8000'  // local development
  : 'https://medinova-igij.onrender.com';  // production


export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    // 1. Basic Validation
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // 2. Call Backend API
    try {
      console.log("Attempting signup with:", { fullName, email });

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: fullName,
          email,
          password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Registration Failed", result.detail || "Failed to create account");
        return;
      }

      Alert.alert("Success", "Account created successfully!");
      // Automatically navigate to sign-in page after 1.5 seconds
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.log("Signup error:", error);
      Alert.alert(
        "Error",
        "Could not connect to backend. Please check your internet connection."
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Background.png")}
      className="w-full h-full"
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* White Card Container */}
          <View className="bg-white/95 rounded-3xl px-6 py-8 shadow-xl w-full max-w-sm self-center">

            {/* Logo Image */}
            <View className="items-center mb-4">
              <Image
                source={require("../(Home)/Mainlogo.jpeg")}
                className="w-32 h-32"
                resizeMode="contain"
              />
            </View>

            <Text className="text-xl font-bold text-center text-gray-700 mb-6">
              Create Account
            </Text>

            {/* Inputs Group */}
            <View className="gap-y-3">
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
                className="w-full bg-gray-100 rounded-full py-3 px-6 text-gray-700 shadow-sm"
              />

              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                className="w-full bg-gray-100 rounded-full py-3 px-6 text-gray-700 shadow-sm"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                className="w-full bg-gray-100 rounded-full py-3 px-6 text-gray-700 shadow-sm"
              />

              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                className="w-full bg-gray-100 rounded-full py-3 px-6 text-gray-700 shadow-sm"
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              className="w-full bg-[#00A67E] rounded-full py-4 items-center shadow-md mt-6 mb-2"
            >
              <Text className="text-white text-lg font-bold">Sign Up</Text>
            </TouchableOpacity>

            {/* Footer Navigation */}
            <View className="flex-row justify-center mt-2">
              <Text className="text-gray-600">Already have an account? </Text>
              {/* Use router.back() if this screen was pushed on top of login */}
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-[#00A67E] font-bold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}