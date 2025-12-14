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

// TODO: Implement authentication using REST API calls to the backend server
// The backend is now running separately at E:\Projects\MediNovaBackend
// See backend README.md for API endpoints and usage examples


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

    // 2. Call Backend API (TODO: Implement REST API call)
    try {
      // TODO: Replace this with actual API call to the backend
      // Example:
      // const response = await fetch('http://localhost:8000/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username: fullName, email, password })
      // });
      // const result = await response.json();

      console.log("Attempting signup with:", { fullName, email });

      Alert.alert(
        "Authentication Not Configured",
        "Backend authentication has been separated. Please implement REST API calls to the backend server."
      );

      // Temporary: Commenting out navigation
      // Alert.alert("Success", "Account created successfully!");
      // setTimeout(() => {
      //   router.back();
      // }, 1500);
    } catch (error) {
      console.log("Signup error:", (error as any).message);
      Alert.alert(
        "Error",
        (error as any).message
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          {/* Header Title */}
          <Text className="text-4xl font-bold text-green-600 text-center mb-6 tracking-widest drop-shadow-lg">
            MediNova
          </Text>

          {/* White Card Container */}
          <View className="bg-white/95 rounded-3xl px-6 py-8 shadow-xl w-full max-w-sm self-center">

            {/* Logo Image */}
            <View className="items-center mb-4">
              <Image
                source={require("../../assets/images/Home.jpeg")}
                className="w-24 h-24" // Made slightly smaller for signup to fit more inputs
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