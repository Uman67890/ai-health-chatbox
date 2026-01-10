import { saveUserGoal, getAllMetrics } from './healthTrackingService';

interface DayPlan {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
    workout: string;
}

export interface HealthPlan {
    goal: string;
    calories: number;
    schedule: DayPlan[];
    tip: string;
}

export const generateHealthPlan = (goal: string): HealthPlan => {
    saveUserGoal(goal);
    const metrics = getAllMetrics();

    // Simple logic to adjust plan based on weight (if available)
    const recentWeight = metrics.weight.length > 0 ? metrics.weight[metrics.weight.length - 1].value : 70;

    let calories = 2000;
    let workoutIntensity = "Moderate";
    let schedule: DayPlan[] = [];

    if (goal === 'Weight Loss') {
        calories = Math.max(1500, recentWeight * 22); // Rough estimate
        workoutIntensity = "Cardio-focused";
        schedule = [
            {
                breakfast: "Oatmeal with berries",
                lunch: "Grilled chicken salad",
                dinner: "Steamed fish with vegetables",
                snack: "Apple and almonds",
                workout: "30 min Brisk Walk / Light Jog"
            }
        ];
    } else if (goal === 'Muscle Gain') {
        calories = recentWeight * 30 + 300;
        workoutIntensity = "Strength-focused";
        schedule = [
            {
                breakfast: "Eggs and whole wheat toast",
                lunch: "Turkey wrap with brown rice",
                dinner: "Lean beef with sweet potato",
                snack: "Greek yogurt with protein powder",
                workout: "45 min Bodyweight Strength Training"
            }
        ];
    } else {
        // Maintenance
        calories = recentWeight * 25;
        workoutIntensity = "Balanced";
        schedule = [
            {
                breakfast: "Smoothie bowl",
                lunch: "Quinoa salad with chickpeas",
                dinner: "Stir-fry tofu and veggies",
                snack: "Fruit salad",
                workout: "30 min Yoga / Stretching"
            }
        ];
    }

    return {
        goal,
        calories: Math.round(calories),
        schedule,
        tip: `Based on your weight of ${recentWeight}kg, this ${workoutIntensity} plan is a safe starting point.`
    };
};
