import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Exercise {
    exercise_name: string;
    duration: number;
    calories: number;
    sets?: number | null;
    reps?: number | null;
    completed: boolean;
}

interface WorkoutPlan {
    Cardio: Exercise[];
    Strength: Exercise[];
    Flexibility: Exercise[];
}

export default function ExercisePlanScreen() {
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<number>(1);
    const [exercises, setExercises] = useState<Record<string, WorkoutPlan>>({});

    const API_URL = 'https://medinova-igij.onrender.com';  // production

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Load user ID and exercise plan on mount
    useEffect(() => {
        const loadUserAndPlan = async () => {
            try {
                const userStr = await AsyncStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    const uid = user.id || 1;
                    setUserId(uid);
                    await loadExercisePlan(uid);
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error loading user:', error);
                setIsLoading(false);
            }
        };
        loadUserAndPlan();
    }, []);

    const loadExercisePlan = async (uid: number) => {
        try {
            const response = await fetch(`${API_URL}/exercise/${uid}`);
            const data = await response.json();
            if (data.success && data.exercise_plan) {
                // Add completed:false to each exercise
                const planWithCompletion: Record<string, WorkoutPlan> = {};
                Object.keys(data.exercise_plan).forEach(day => {
                    planWithCompletion[day] = {
                        Cardio: data.exercise_plan[day].Cardio.map((ex: any) => ({ ...ex, completed: false })),
                        Strength: data.exercise_plan[day].Strength.map((ex: any) => ({ ...ex, completed: false })),
                        Flexibility: data.exercise_plan[day].Flexibility.map((ex: any) => ({ ...ex, completed: false }))
                    };
                });
                setExercises(planWithCompletion);
            }
        } catch (error) {
            console.error('Error loading exercise plan:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const currentPlan = exercises[selectedDay] || (Object.keys(exercises).length > 0 ? exercises[Object.keys(exercises)[0]] : null);

    const calculateTotalStats = () => {
        if (!currentPlan) {
            return { totalCalories: 0, totalMinutes: 0, completedCount: 0, totalCount: 0 };
        }

        const allExercises = [
            ...currentPlan.Cardio,
            ...currentPlan.Strength,
            ...currentPlan.Flexibility,
        ];

        const totalCalories = allExercises.reduce((sum, ex) => sum + ex.calories, 0);
        const totalMinutes = allExercises.reduce((sum, ex) => sum + ex.duration, 0);
        const completedCount = allExercises.filter(ex => ex.completed).length;
        const totalCount = allExercises.length;

        return { totalCalories, totalMinutes, completedCount, totalCount };
    };

    const stats = calculateTotalStats();
    const progressPercentage = stats.totalCount > 0 ? (stats.completedCount / stats.totalCount) * 100 : 0;

    const toggleExerciseComplete = (category: keyof WorkoutPlan, index: number) => {
        setExercises(prev => {
            const updated = { ...prev };
            const dayPlan = { ...updated[selectedDay] };
            const categoryPlan = [...dayPlan[category]];
            categoryPlan[index] = { ...categoryPlan[index], completed: !categoryPlan[index].completed };
            dayPlan[category] = categoryPlan;
            updated[selectedDay] = dayPlan;
            return updated;
        });
    };

    const handleGenerateAIPlan = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch(`${API_URL}/exercise/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, preferences: '' })
            });
            const data = await response.json();

            if (data.success && data.exercise_plan) {
                // Add completed:false to each exercise
                const planWithCompletion: Record<string, WorkoutPlan> = {};
                Object.keys(data.exercise_plan).forEach(day => {
                    planWithCompletion[day] = {
                        Cardio: data.exercise_plan[day].Cardio.map((ex: any) => ({ ...ex, completed: false })),
                        Strength: data.exercise_plan[day].Strength.map((ex: any) => ({ ...ex, completed: false })),
                        Flexibility: data.exercise_plan[day].Flexibility.map((ex: any) => ({ ...ex, completed: false }))
                    };
                });
                setExercises(planWithCompletion);
                Alert.alert('Success!', 'Your personalized exercise plan has been generated! 💪');
            }
        } catch (error) {
            console.error('Error generating plan:', error);
            Alert.alert('Error', 'Failed to generate exercise plan. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const renderExerciseSection = (
        title: string,
        exercises: Exercise[],
        icon: string,
        color: string,
        category: keyof WorkoutPlan
    ) => {
        if (!exercises || exercises.length === 0) {
            return null;
        }

        return (
            <View className="mb-4">
                <View className="flex-row items-center mb-3">
                    <View className={`bg-${color}-100 rounded-full p-2 mr-2`} style={{ backgroundColor: `${color === 'blue' ? '#DBEAFE' : color === 'orange' ? '#FFEDD5' : '#E9D5FF'}` }}>
                        <Ionicons name={icon as any} size={20} color={color === 'blue' ? '#2563EB' : color === 'orange' ? '#EA580C' : '#9333EA'} />
                    </View>
                    <Text className="text-lg font-bold text-gray-800">{title}</Text>
                    <Text className="text-gray-500 text-sm ml-2">
                        ({exercises.filter(e => e.completed).length}/{exercises.length})
                    </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-sm">
                    {exercises.map((exercise, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => toggleExerciseComplete(category, index)}
                            className={index !== 0 ? 'mt-3 pt-3 border-t border-gray-100' : ''}
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-1">
                                    <View className="flex-row items-center mb-1">
                                        <View className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${exercise.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                                            }`}>
                                            {exercise.completed && <Ionicons name="checkmark" size={16} color="white" />}
                                        </View>
                                        <Text className={`font-semibold ${exercise.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                            {exercise.exercise_name}
                                        </Text>
                                    </View>
                                    <View className="flex-row flex-wrap gap-2 ml-9">
                                        <View className="bg-blue-50 px-3 py-1 rounded-full">
                                            <Text className="text-blue-600 text-xs font-medium">{exercise.duration} min</Text>
                                        </View>
                                        <View className="bg-orange-50 px-3 py-1 rounded-full">
                                            <Text className="text-orange-600 text-xs font-medium">{exercise.calories} cal</Text>
                                        </View>
                                        {exercise.sets && exercise.reps && (
                                            <View className="bg-purple-50 px-3 py-1 rounded-full">
                                                <Text className="text-purple-600 text-xs font-medium">
                                                    {exercise.sets} × {exercise.reps}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

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
                            Exercise Plan
                        </Text>
                    </View>

                    {/* Daily Stats Summary */}
                    <View className="bg-white/20 rounded-2xl p-4 mb-2">
                        <Text className="text-white text-sm font-semibold mb-2">Today's Goals</Text>
                        <View className="flex-row justify-around">
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{stats.totalMinutes}</Text>
                                <Text className="text-white/80 text-xs">Minutes</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{stats.totalCalories}</Text>
                                <Text className="text-white/80 text-xs">Calories</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-2xl font-bold">{stats.totalCount}</Text>
                                <Text className="text-white/80 text-xs">Exercises</Text>
                            </View>
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View className="bg-white/20 rounded-full h-3 overflow-hidden">
                        <View
                            className="bg-white h-full rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </View>
                    <Text className="text-white text-xs text-center mt-1">
                        {Math.round(progressPercentage)}% Complete
                    </Text>
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
                            className={selectedDay === day
                                ? 'px-5 py-2 rounded-full mr-2 bg-[#00A67E]'
                                : 'px-5 py-2 rounded-full mr-2 bg-gray-100'}
                        >
                            <Text className={selectedDay === day ? 'font-semibold text-white' : 'font-semibold text-gray-600'}>
                                {day.substring(0, 3)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Exercise Plans */}
                <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
                    {isLoading ? (
                        <View className="flex-1 items-center justify-center py-20">
                            <ActivityIndicator size="large" color="#00A67E" />
                            <Text className="text-gray-500 mt-4">Loading your exercise plan...</Text>
                        </View>
                    ) : !currentPlan || Object.keys(exercises).length === 0 ? (
                        <View className="bg-white rounded-2xl p-6 mb-4">
                            <View className="items-center py-8">
                                <Ionicons name="fitness-outline" size={80} color="#9CA3AF" />
                                <Text className="text-xl font-bold text-gray-800 mt-4 mb-2">Generating Your Exercise Plan</Text>
                                <Text className="text-gray-600 text-center mb-6 px-4">
                                    Please wait while we create your personalized AI workout plan...
                                </Text>
                                <ActivityIndicator size="large" color="#00A67E" />
                            </View>
                        </View>
                    ) : (
                        <>
                            {renderExerciseSection('Cardio Exercises', currentPlan?.Cardio || [], 'heart', 'blue', 'Cardio')}
                            {renderExerciseSection('Strength Training', currentPlan?.Strength || [], 'barbell', 'orange', 'Strength')}
                            {renderExerciseSection('Flexibility & Recovery', currentPlan?.Flexibility || [], 'body', 'purple', 'Flexibility')}
                        </>
                    )}

                    {/* Fitness Tips Card */}
                    <View className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-100">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="bulb" size={20} color="#059669" />
                            <Text className="text-green-700 font-bold ml-2">Fitness Tips</Text>
                        </View>
                        <Text className="text-green-600 text-sm">
                            {'\u2022'} Warm up for 5-10 minutes before exercising{'\n'}
                            {'\u2022'} Stay hydrated throughout your workout{'\n'}
                            {'\u2022'} Focus on form over speed{'\n'}
                            {'\u2022'} Allow 24-48 hours rest between strength sessions
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
