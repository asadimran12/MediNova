import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MealItem {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface DayPlan {
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
    snacks: MealItem[];
}

export default function DietPlanScreen() {
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);
    const API_URL = 'https://medinova-igij.onrender.com';

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Diet plan data - loaded from backend API only
    const [dietPlan, setDietPlan] = useState<Record<string, DayPlan>>({});

    const currentPlan = dietPlan[selectedDay] || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    };

    const calculateTotalNutrition = () => {
        const allMeals = [
            ...currentPlan.breakfast,
            ...currentPlan.lunch,
            ...currentPlan.dinner,
            ...currentPlan.snacks,
        ];

        return allMeals.reduce(
            (total, meal) => ({
                calories: total.calories + meal.calories,
                protein: total.protein + meal.protein,
                carbs: total.carbs + meal.carbs,
                fat: total.fat + meal.fat,
            }),
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
    };

    const totalNutrition = calculateTotalNutrition();

    // Load user ID and diet plan on mount
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            // Get user ID from storage (saved during login)
            const userStr = await AsyncStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                const id = user.id || 1; // Default to 1 if no ID
                setUserId(id);
                // Load existing diet plan
                await loadDietPlan(id);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadDietPlan = async (uid: number) => {
        try {
            const response = await fetch(`${API_URL}/diet/${uid}`);
            const data = await response.json();
            if (data.success && data.diet_plan) {
                setDietPlan(data.diet_plan);
            }
        } catch (error) {
            console.error('Error loading diet plan:', error);
        }
    };

    const renderMealSection = (title: string, meals: MealItem[], icon: string) => (
        <View className="mb-4">
            <View className="flex-row items-center mb-3">
                <View className="bg-green-100 rounded-full p-2 mr-2">
                    <Ionicons name={icon as any} size={20} color="#00A67E" />
                </View>
                <Text className="text-lg font-bold text-gray-800">{title}</Text>
            </View>

            <View className="bg-white rounded-2xl p-4 shadow-sm">
                {meals.map((meal, index) => (
                    <View key={index} className={index !== 0 ? 'mt-3 pt-3 border-t border-gray-100' : ''}>
                        <Text className="text-gray-800 font-semibold mb-2">{meal.name}</Text>
                        <View className="flex-row flex-wrap gap-2">
                            <View className="bg-orange-50 px-3 py-1 rounded-full">
                                <Text className="text-orange-600 text-xs font-medium">{meal.calories} cal</Text>
                            </View>
                            <View className="bg-blue-50 px-3 py-1 rounded-full">
                                <Text className="text-blue-600 text-xs font-medium">{meal.protein}g protein</Text>
                            </View>
                            <View className="bg-purple-50 px-3 py-1 rounded-full">
                                <Text className="text-purple-600 text-xs font-medium">{meal.carbs}g carbs</Text>
                            </View>
                            <View className="bg-yellow-50 px-3 py-1 rounded-full">
                                <Text className="text-yellow-600 text-xs font-medium">{meal.fat}g fat</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );

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
                        <Text className="text-white text-2xl font-bold flex-1 text-center mr-10">
                            Diet Plan
                        </Text>
                    </View>

                    {/* Daily Nutrition Summary */}
                    <View className="bg-white/20 rounded-2xl p-4">
                        <Text className="text-white text-sm font-semibold mb-2">Today's Total</Text>
                        <View className="flex-row justify-around">
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{totalNutrition.calories}</Text>
                                <Text className="text-white/80 text-xs">Calories</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{totalNutrition.protein}g</Text>
                                <Text className="text-white/80 text-xs">Protein</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{totalNutrition.carbs}g</Text>
                                <Text className="text-white/80 text-xs">Carbs</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{totalNutrition.fat}g</Text>
                                <Text className="text-white/80 text-xs">Fat</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Day Selector */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="max-h-20 bg-white border-b border-gray-200"
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                >
                    {days.map((day) => (
                        <TouchableOpacity
                            key={day}
                            onPress={() => setSelectedDay(day)}
                            className={selectedDay === day ? 'px-5 py-2 rounded-full mr-2 bg-[#00A67E]' : 'px-5 py-2 rounded-full mr-2 bg-gray-100'}
                        >
                            <Text className={selectedDay === day ? 'font-semibold text-white' : 'font-semibold text-gray-600'}>
                                {day.substring(0, 3)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Meal Plans */}
                <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
                    {isLoading ? (
                        <View className="flex-1 items-center justify-center py-20">
                            <ActivityIndicator size="large" color="#00A67E" />
                            <Text className="text-gray-500 mt-4">Loading your diet plan...</Text>
                        </View>
                    ) : Object.keys(dietPlan).length === 0 ? (
                        <View className="bg-orange-50 rounded-2xl p-6 mb-6 border border-orange-200">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="restaurant-outline" size={24} color="#F97316" />
                                <Text className="text-orange-700 font-bold ml-2 text-lg">No Diet Plan Yet</Text>
                            </View>
                            <Text className="text-orange-600 text-sm leading-6">
                                You don't have a diet plan yet. Go to the chat and ask me to create a personalized diet plan for you!{'\n\n'}
                                Just say: "Create me a diet plan" or "I need a meal plan"
                            </Text>
                        </View>
                    ) : (
                        <>
                            {renderMealSection('Breakfast', currentPlan.breakfast, 'sunny')}
                            {renderMealSection('Lunch', currentPlan.lunch, 'restaurant')}
                            {renderMealSection('Dinner', currentPlan.dinner, 'moon')}
                            {renderMealSection('Snacks', currentPlan.snacks, 'nutrition')}

                            {/* Info Card */}
                            <View className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-100 mt-4">
                                <View className="flex-row items-center mb-2">
                                    <Ionicons name="information-circle" size={20} color="#00A67E" />
                                    <Text className="text-green-700 font-bold ml-2">Update Your Diet Plan</Text>
                                </View>
                                <Text className="text-green-600 text-sm">
                                    Want a new diet plan? Go back to chat and ask me to create a fresh one for you!
                                </Text>
                            </View>
                        </>
                    )}

                    {/* Tips Card */}
                    <View className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="bulb" size={20} color="#3B82F6" />
                            <Text className="text-blue-700 font-bold ml-2">Nutrition Tips</Text>
                        </View>
                        <Text className="text-blue-600 text-sm">
                            {'\u2022'} Stay hydrated with 8 glasses of water daily{'\n'}
                            {'\u2022'} Eat every 3-4 hours to maintain metabolism{'\n'}
                            {'\u2022'} Include colorful vegetables in every meal{'\n'}
                            {'\u2022'} Avoid processed foods and added sugars
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
