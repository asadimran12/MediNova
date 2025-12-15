import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
    const [isGenerating, setIsGenerating] = useState(false);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Sample diet plan data
    const dietPlan: Record<string, DayPlan> = {
        Monday: {
            breakfast: [
                { name: 'Oatmeal with Berries', calories: 320, protein: 12, carbs: 54, fat: 6 },
                { name: 'Greek Yogurt', calories: 150, protein: 15, carbs: 12, fat: 4 },
            ],
            lunch: [
                { name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 25, fat: 18 },
                { name: 'Quinoa Bowl', calories: 280, protein: 10, carbs: 45, fat: 8 },
            ],
            dinner: [
                { name: 'Baked Salmon', calories: 380, protein: 40, carbs: 5, fat: 22 },
                { name: 'Steamed Vegetables', calories: 120, protein: 4, carbs: 20, fat: 2 },
            ],
            snacks: [
                { name: 'Apple with Almond Butter', calories: 200, protein: 5, carbs: 22, fat: 12 },
                { name: 'Protein Shake', calories: 180, protein: 25, carbs: 8, fat: 4 },
            ],
        },
    };

    const currentPlan = dietPlan[selectedDay] || dietPlan['Monday'];

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

    const handleGenerateAIPlan = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            Alert.alert(
                'AI Diet Plan',
                'This feature will generate a personalized diet plan based on your health goals and preferences.',
                [{ text: 'OK' }]
            );
        }, 1500);
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
                    {renderMealSection('Breakfast', currentPlan.breakfast, 'sunny')}
                    {renderMealSection('Lunch', currentPlan.lunch, 'restaurant')}
                    {renderMealSection('Dinner', currentPlan.dinner, 'moon')}
                    {renderMealSection('Snacks', currentPlan.snacks, 'nutrition')}

                    {/* AI Generation Button */}
                    <TouchableOpacity
                        onPress={handleGenerateAIPlan}
                        disabled={isGenerating}
                        className="bg-[#00A67E] rounded-2xl p-4 flex-row items-center justify-center shadow-lg mt-4 mb-6"
                    >
                        <Ionicons
                            name={isGenerating ? 'reload' : 'sparkles'}
                            size={24}
                            color="white"
                            style={{ marginRight: 8 }}
                        />
                        <Text className="text-white text-lg font-bold">
                            {isGenerating ? 'Generating...' : 'Generate AI Diet Plan'}
                        </Text>
                    </TouchableOpacity>

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
