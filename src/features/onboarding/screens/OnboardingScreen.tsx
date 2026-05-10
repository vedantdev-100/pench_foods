import React, { useRef, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { onboardingSlides, OnboardingSlide } from "../data/onboardingData";
import { onboardingUtils } from "../utils/onboardingUtils";

const { width } = Dimensions.get("window");

function OnboardingSlideItem({ item }: { item: OnboardingSlide }) {
    return (
        <View style={{ width }} className="flex-1 items-center justify-center px-8">
            <View
                className="w-40 h-40 rounded-full items-center justify-center mb-10"
                style={{ backgroundColor: item.bgColor }}
            >
                <Text style={{ fontSize: 72 }}>{item.emoji}</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
                {item.title}
            </Text>
            <Text className="text-base text-gray-500 text-center leading-6">
                {item.description}
            </Text>
        </View>
    );
}

export default function OnboardingScreen() {
    const router = useRouter();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const isLastSlide = currentIndex === onboardingSlides.length - 1;

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (isLastSlide) {
            handleGetStarted();
        } else {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        }
    };

    const handleGetStarted = async () => {
        setLoading(true);
        try {
            await onboardingUtils.markComplete();
        } catch (e) {
            console.log("❌ SecureStore error:", e);
        } finally {
            setLoading(false);
            router.replace("/(auth)/login" as any); // ✅ always navigates
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Skip */}
            <TouchableOpacity
                onPress={handleGetStarted}
                disabled={loading}
                className="absolute top-14 right-6 z-10"
            >
                <Text className="text-blue-500 font-semibold text-base">Skip</Text>
            </TouchableOpacity>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={onboardingSlides}
                renderItem={({ item }) => <OnboardingSlideItem item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                bounces={false}
            />

            {/* Bottom Controls */}
            <View className="pb-12 px-8 items-center gap-6">
                {/* Dots */}
                <View className="flex-row gap-2">
                    {onboardingSlides.map((_, i) => (
                        <View
                            key={i}
                            className={`h-2 rounded-full ${i === currentIndex ? "w-6 bg-blue-500" : "w-2 bg-gray-300"
                                }`}
                        />
                    ))}
                </View>

                {/* Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    disabled={loading}
                    className="w-full bg-blue-500 py-4 rounded-2xl items-center"
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-bold text-lg">
                            {isLastSlide ? "Get Started 🚀" : "Next →"}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}