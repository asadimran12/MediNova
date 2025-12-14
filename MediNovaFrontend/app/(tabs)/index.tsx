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


export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      // TODO: Replace this with actual API call to the backend
      // Example:
      // const response = await fetch('http://localhost:8000/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const result = await response.json();

      Alert.alert(
        "Authentication Not Configured",
        "Backend authentication has been separated. Please implement REST API calls to the backend server."
      );

      // Temporary: Allow navigation for development
      // router.push("/home");
    } catch (error) {
      console.log("Login error:", (error as any).message);
      Alert.alert(
        "Error",
        "Could not connect to backend."
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
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-4xl font-bold text-green-600 text-center mb-10 tracking-widest drop-shadow-lg">
            MediNova
          </Text>

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
