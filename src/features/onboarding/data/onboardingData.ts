// src/features/onboarding/data/onboardingData.ts
export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  emoji: string;
  bgColor: string;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "1",
    emoji: "🥛",
    title: "Fresh Milk Daily",
    description:
      "Get farm-fresh milk delivered to your doorstep every morning. Never run out again!",
    bgColor: "#EFF6FF",
  },
  {
    id: "2",
    emoji: "🚚",
    title: "Track Your Delivery",
    description:
      "Know exactly when your milk arrives. Track your delivery agent live on the map.",
    bgColor: "#F0FDF4",
  },
];