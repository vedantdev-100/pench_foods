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
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import { onboardingSlides, OnboardingSlide } from "../data/onboardingData";
import { onboardingUtils } from "../utils/onboardingUtils";

const { width, height } = Dimensions.get("window");

type SlideSize = "sm" | "md" | "lg";

const IMAGE_SIZE: Record<SlideSize, string> = {
    sm: "w-48 h-48",
    md: "w-64 h-64",
    lg: "w-90 h-90",
};

const CONTAINER_SIZE: Record<SlideSize, string> = {
    sm: "w-56 h-56",
    md: "w-72 h-72",
    lg: "w-90 h-90",
};

function OnboardingSlideItem({
    item,
    size ="lg"
}: {
    item: OnboardingSlide;
    size?: SlideSize;
}) {
    return (
        <View style={{ width, height }} className="items-center justify-center">

            {/* ── Image ─────────────────────────────────────────────── */}
            <View className="items-center justify-center mb-8 h-[55%]">
                <View
                    className={`${CONTAINER_SIZE[size]} items-center justify-center overflow-hidden`}
                    style={{ backgroundColor: item.bgColor }}
                >
                    <Image
                        source={item.image}
                        className={IMAGE_SIZE[size]}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* ── Text ──────────────────────────────────────────────── */}
            <View className="items-center px-8">
                <Text className="text-3xl font-bold text-text-primary text-center mb-3">
                    {item.title}
                </Text>
                <Text className="text-base text-text-secondary text-center leading-6">
                    {item.description}
                </Text>
            </View>

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
            router.replace("/(auth)/login" as any);
        }
    };

    return (
        <View className="flex-1 bg-brand-light">

            {/* ── Skip button ───────────────────────────────────────── */}
            <TouchableOpacity
                onPress={handleGetStarted}
                disabled={loading}
                className="absolute top-14 right-6 z-10"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
                <Text className="text-brand-primary font-semibold text-base">
                    Skip
                </Text>
            </TouchableOpacity>

            {/* ── Slides ────────────────────────────────────────────── */}
            <FlatList
                ref={flatListRef}
                data={onboardingSlides}
                renderItem={({ item }) => <OnboardingSlideItem item={item}  size={item === 0 ? "md" : "lg"} />}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                bounces={false}
            />

            {/* ── Bottom Controls ───────────────────────────────────── */}
            <View className="pb-12 px-8 items-center gap-y-6">

                {/* Dots */}
                <View className="flex-row items-center gap-x-2">
                    {onboardingSlides.map((_, i) => (
                        <View
                            key={i}
                            className={`h-2 rounded-full transition-all ${i === currentIndex
                                ? "w-6 bg-brand-primary"
                                : "w-2 bg-border"
                                }`}
                        />
                    ))}
                </View>

                {/* Next / Get Started button */}
                <TouchableOpacity
                    onPress={handleNext}
                    disabled={loading}
                    activeOpacity={0.85}
                    className="w-full bg-brand-primary py-4 rounded-2xl items-center"
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-bold text-lg">
                            {isLastSlide ? "Get Started" : "Next →"}
                        </Text>
                    )}
                </TouchableOpacity>

            </View>
        </View>
    );
}