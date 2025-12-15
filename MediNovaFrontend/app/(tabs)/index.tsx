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
const API_URL = 'https://medinova-igij.onrender.com';


export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      // Get response text first to debug parsing issues
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response:", responseText);
        Alert.alert("Error", "Server returned invalid response. Please try again later.");
        return;
      }

      if (!response.ok) {
        Alert.alert("Login Failed", result.detail || "Invalid credentials");
        return;
      }

      // Store the access token (you might want to use AsyncStorage here)
      console.log("Login successful! Token:", result.access_token);

      // Navigate to chatbot home page
      router.push("/(Home)/home");
    } catch (error) {
      console.log("Login error:", error);
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
          }}
          showsVerticalScrollIndicator={false}
        >
          <Image source={require("../(Home)/Mainlogo.jpeg")} className="w-40 h-40 self-center" />

          <View className="bg-white/95 rounded-3xl px-6 py-8 shadow-xl w-full max-w-sm self-center">
            <View className="items-center mb-4">
              <Image
                source={require("../../assets/images/Home.jpeg")}
                className="w-40 h-40"
                resizeMode="contain"
              />
            </View>

            <Text className="text-xl font-bold text-center text-gray-700 mb-4">
              Welcome Back
            </Text>

            <View className="gap-y-3">
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                className="w-full bg-gray-100 rounded-full py-3 px-6 text-gray-700 shadow-sm"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                className="w-full bg-gray-100 rounded-full py-3 px-6 text-gray-700 shadow-sm"
              />
            </View>

            <TouchableOpacity className="mt-3 mb-4">
              <Text className="text-green-600 font-bold text-center">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignIn}
              className="w-full bg-[#00A67E] rounded-full py-4 items-center shadow-md mb-2"
            >
              <Text className="text-white text-lg font-bold">Sign In</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-2">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(tabs)/explore")}>
                <Text className="text-[#00A67E] font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
